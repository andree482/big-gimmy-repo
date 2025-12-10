import { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendAdminNotification, sendUserConfirmation, sendPersonalizedReply } from './services/email.ts';
import { syncAllImages } from "./utils/imageSync.ts";
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
// ... existing code ...
import { db } from "./db";
import { products, productImages } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import Stripe from "stripe";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
  import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {

  // ================================
  // SESSION CONFIGURATION
  // ================================
  
  console.log('🔧 Configurazione middleware di sessione con PostgreSQL...');
  
  const pgSession = connectPgSimple(session);
  
  app.use(session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'big-gimmy-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: false,
      httpOnly: true,
      sameSite: 'lax'
    },
    rolling: true,
    name: 'biggimmy-session'
  }));


  
  console.log('✅ Middleware di sessione PostgreSQL configurato');

  // ================================
  // AUTHENTICATION & SESSION ROUTES
  // ================================



  // Login endpoint
 app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password, code } = req.body || {};
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      if (typeof code === "string" && code.length > 0) {
        if (code !== ADMIN_CODE) {
          return res.status(401).json({ success: false, message: "Codice non valido" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const now = new Date().toISOString();
        let sessionUserId: any = Date.now();
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (client) {
          try {
            const { data } = await (client as any)
              .from("users")
              .select("id,email,first_name,last_name")
              .eq("email", adminEmail)
              .limit(1)
              .maybeSingle();
            if (data && data.id) {
              sessionUserId = String(data.id);
            } else {
              const newId = crypto.randomUUID();
              await (client as any)
                .from("users")
                .insert({ id: newId, email: adminEmail, created_at: now, updated_at: now, first_name: "Admin", last_name: "User" });
              sessionUserId = newId;
            }
          } catch {}
        }
        (req.session as any).user = {
          id: sessionUserId,
          email: adminEmail,
          authenticated: true,
          isAdmin: true,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: "Admin",
          lastName: "User",
        };
        return res.json({ success: true, message: "Login effettuato con successo", user: { email: adminEmail, isAdmin: true } });
      }

      if (email) {
        if (!password) {
          return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (!client) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { data } = await (client as any)
          .from("users")
          .select("id,email,first_name,last_name,is_admin,password")
          .eq("email", email)
          .limit(1)
          .maybeSingle();
        if (!data || !data.id || String(data.password) !== String(password)) {
          return res.status(401).json({ success: false, message: "Credenziali non valide" });
        }
        const now = new Date().toISOString();
        (req.session as any).user = {
          id: String(data.id),
          email: String(data.email),
          authenticated: true,
          isAdmin: !!data.is_admin,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        return res.json({ success: true, message: "Login effettuato con successo", user: { email, isAdmin: !!data.is_admin } });
      }

      const { username, password: pwd } = req.body;
      if (username || pwd) {
        return res.status(401).json({ success: false, message: "Login via username/password disabilitato" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Endpoint current user per client/auth gating
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const user = (req.session as any)?.user;
      if (user && user.authenticated) {
        const payload = {
          id: user.id ?? 0,
          email: user.email ?? (user.username ? `${user.username}@local` : undefined),
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          province: user.province,
          country: user.country,
          createdAt: user.createdAt ?? user.loginTime ?? new Date().toISOString(),
          updatedAt: user.updatedAt ?? new Date().toISOString(),
          username: user.username,
          isAdmin: !!user.isAdmin,
        };
        return res.json({ success: true, authenticated: true, user: payload });
      }
      return res.json({ success: true, authenticated: false });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Access Gate: verifica codice (non associa alcun utente)
  app.post("/api/access/verify", async (req: Request, res: Response) => {
    try {
      const { code } = req.body || {};
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      if (typeof code !== "string" || code.length === 0) {
        return res.status(400).json({ success: false, message: "Codice mancante" });
      }
      if (code !== ADMIN_CODE) {
        return res.status(401).json({ success: false, message: "Codice non valido" });
      }
      (req.session as any).siteAccessGranted = true;
      return res.json({ success: true, granted: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Access Gate: stato
  app.get("/api/access/status", async (req: Request, res: Response) => {
    try {
      const granted = !!((req.session as any)?.siteAccessGranted);
      return res.json({ success: true, granted });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Registrazione session-only (test)
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone, address, city, postalCode, province, country } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
      }
      if (!req.session) {
        return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
      }
      const now = new Date().toISOString();
      (req.session as any).user = {
        id: Date.now(),
        email,
        authenticated: true,
        isAdmin: false,
        createdAt: now,
        updatedAt: now,
        firstName, lastName, phone, address, city, postalCode, province, country
      };
      return res.json({ success: true, message: "Registrazione effettuata con successo", user: (req.session as any).user });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Aggiornamento profilo (session-only)
  app.put("/api/auth/profile", async (req: Request, res: Response) => {
    try {
      const sessUser = (req.session as any)?.user;
      if (!sessUser?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const allowed = ["firstName","lastName","phone","address","city","postalCode","province","country"];
      const updates: Record<string, any> = {};
      for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
      (req.session as any).user = { ...sessUser, ...updates, updatedAt: new Date().toISOString() };
      return res.json({ success: true, message: "Profilo aggiornato", user: (req.session as any).user });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // ================================
  // ADMIN ORDERS (mock) - solo admin
  // ================================
   const MOCK_ORDERS = [
    {
      id: 1001,
      userId: 501,
      snipcartOrderId: "SNIP-001001",
      total: 4599,
      status: "ordered",
      items: [
        { id: "p-1", name: "Proteine Whey 1kg", quantity: 1, price: 2999 },
        { id: "p-2", name: "Creatina Monoidrato 300g", quantity: 1, price: 1600 },
      ],
      shippingAddress: { street: "Via Roma 10", city: "Torino", postalCode: "10121", province: "TO" },
      billingAddress: { street: "Via Roma 10", city: "Torino", postalCode: "10121", province: "TO" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: "mario.rossi@example.com",
      userFirstName: "Mario",
      userLastName: "Rossi",
    },
    {
      id: 1002,
      userId: 502,
      snipcartOrderId: "SNIP-001002",
      total: 8999,
      status: "completed",
      items: [
        { id: "p-3", name: "Omega-3 120 cps", quantity: 2, price: 1999 },
        { id: "p-4", name: "Multivitaminico", quantity: 1, price: 5001 },
      ],
      shippingAddress: { street: "Via Garibaldi 5", city: "Milano", postalCode: "20100", province: "MI" },
      billingAddress: { street: "Via Garibaldi 5", city: "Milano", postalCode: "20100", province: "MI" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: "laura.bianchi@example.com",
      userFirstName: "Laura",
      userLastName: "Bianchi",
    },
    {
      id: 1003,
      userId: 503,
      snipcartOrderId: "SNIP-001003",
      total: 6599,
      status: "processing",
      items: [
        { id: "p-5", name: "Termogenico X", quantity: 1, price: 3299 },
        { id: "p-6", name: "Barrette Proteiche (box)", quantity: 1, price: 3300 },
      ],
      shippingAddress: { street: "Corso Francia 45", city: "Torino", postalCode: "10138", province: "TO" },
      billingAddress: { street: "Corso Francia 45", city: "Torino", postalCode: "10138", province: "TO" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: "giulia.verdi@example.com",
      userFirstName: "Giulia",
      userLastName: "Verdi",
    },
  ];

  app.get("/api/admin/orders", async (req: Request, res: Response) => {
    try {
      const user = (req.session as any)?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      if (!user?.isAdmin) {
        return res.status(403).json({ success: false, message: "Accesso negato" });
      }
      // Restituisce l'array puro come atteso dal client
      return res.json(MOCK_ORDERS);
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });


  app.get("/api/admin/users", async (req: Request, res: Response) => {
    try {
      const user = (req.session as any)?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      if (!user?.isAdmin) {
        return res.status(403).json({ success: false, message: "Accesso negato" });
      }
      return res.json({ success: true, users: MOCK_USERS });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  // Get all contacts endpoint (for admin purposes)
  app.get("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while fetching contacts" 
      });
    }
  });

  // Get all products endpoint (for main /prodotti page)
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { search, brand, priceRange, sortBy } = req.query;

      // Cache lato client per ridurre richieste ripetute (aggiornamento ogni 5 min)
      const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // Cambia ogni 5 minuti
      res.set({
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800',
        'ETag': `products-${timestamp}-${search || 'no-search'}-${brand || 'no-brand'}-${priceRange || 'no-range'}-${sortBy || 'default'}`
      });

      let products;
      
      // Se ci sono parametri di ricerca/filtro, usa searchProducts
      if (search || brand || priceRange || sortBy) {
        products = await storage.searchProducts(
          search as string,
          {
            brandSlug: brand as string,
            priceRange: priceRange as string,
            sortBy: sortBy as string
          }
        );
      } else {
        // Usa searchProducts senza filtri per restituire tutti i productGroups (226 invece di 84)
        products = await storage.searchProducts("", {});
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products" 
      });
    }
  });

  // Get products by category endpoint (grouped by variants)
  app.get("/api/products/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const { search, brand, priceRange, sortBy } = req.query;

      // Set cache headers for real-time price updates
      const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // Cambia ogni 5 minuti
      res.set({
        'Cache-Control': 'no-cache, must-revalidate', // Nessun cache - aggiornamenti istantanei
        'ETag': `products-${category}-${timestamp}-${search || 'no-search'}-${brand || 'no-brand'}-${priceRange || 'no-range'}-${sortBy || 'default'}`
      });

      let products;
      
      // Se ci sono parametri di ricerca/filtro, usa searchProducts con categoria
      if (search || brand || priceRange || sortBy) {
        products = await storage.searchProducts(
          search as string,
          {
            categorySlug: category,
            brandSlug: brand as string,
            priceRange: priceRange as string,
            sortBy: sortBy as string
          }
        );
      } else {
        // Altrimenti usa il metodo esistente
        products = await storage.getProductsByCategory(category);
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products" 
      });
    }
  });

  // Get base products with variants by category endpoint
  app.get("/api/base-products/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const baseProducts = await storage.getBaseProductsByCategory(category);
      res.json(baseProducts);
    } catch (error) {
      console.error("Error fetching base products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch base products" 
      });
    }
  });

  // Get product variants for a specific base product
  app.get("/api/base-product/:slug/variants", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const variants = await storage.getProductVariants(slug);
      res.json(variants);
    } catch (error) {
      console.error("Error fetching product variants:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product variants" 
      });
    }
  });

  // Get single product by slug endpoint with options and min_price_cents
  app.get("/api/product/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlug(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      // Get product options from database for pricing
      const options = await storage.getProductOptionsById(product.id);
      
      // Calculate min_price_cents from options
      const min_price_cents = options.length > 0 
        ? Math.min(...options.map(opt => opt.priceCents))
        : null;
      
      res.json({
        ...product,
        options,
        min_price_cents
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product" 
      });
    }
  });

  // Get product with full details (images and sizes)
  app.get("/api/product/:slug/details", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlugWithDetails(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}/details`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product details" 
      });
    }
  });

  // Get product options/variants in ProductVariant format (price in euros)
  app.get("/api/product/:slug/options", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Prima provo a trovare il prodotto direttamente
      let product = await storage.getProductBySlug(slug);
      
      // Se non trovato, controllo se è un vecchio slug che necessita di redirect
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          // Restituisco HTTP 301 redirect permanente al nuovo slug
          const redirectUrl = `/api/product/${redirect.newSlug}/options`;
          return res.redirect(301, redirectUrl);
        }
        
        // Se non c'è nemmeno un redirect, restituisco 404
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      const options = await storage.getProductOptionsById(product.id);
      
      const variants = options.map((option: any) => ({
        id: option.id,
        product_id: option.productId,
        flavor: option.flavor || "",
        size: option.size || "",
        price_cents: option.priceCents,
        price: option.priceCents / 100,
        original_price_cents: option.originalPriceCents ?? null,
        originalPrice: option.originalPriceCents ? option.originalPriceCents / 100 : undefined,
        image: option.image || "",
        in_stock: option.inStock,
        inStock: option.inStock
      }));
      
      res.json(variants);
    } catch (error) {
      console.error("Error fetching product options:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product options" 
      });
    }
  });

  // Get all categories endpoint
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch categories" 
      });
    }
  });

  // Get all brands endpoint (with optional filtering by category and search)
  app.get("/api/brands", async (req: Request, res: Response) => {
    try {
      const { category, search } = req.query;
      
      let brands;
      
      // Se ci sono parametri di filtro, usa il metodo filtrato
      if (category || search) {
        brands = await storage.getBrandsFilteredByContext({
          categorySlug: category as string,
          searchQuery: search as string
        });
      } else {
        // Altrimenti usa il metodo standard per ottenere tutti i brand
        brands = await storage.getBrands();
      }
      
      res.json(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch brands" 
      });
    }
  });

  // Create new brand endpoint
  app.post("/api/brands", async (req: Request, res: Response) => {
    try {
      const brand = await storage.createBrand(req.body);
      res.status(201).json(brand);
    } catch (error) {
      console.error("Error creating brand:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create brand" 
      });
    }
  });

  // Create new product endpoint
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product" 
      });
    }
  });

  // Create product image endpoint
  app.post("/api/product-images", async (req: Request, res: Response) => {
    try {
      const image = await storage.createProductImage(req.body);
      res.status(201).json(image);
    } catch (error) {
      console.error("Error creating product image:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product image" 
      });
    }
  });

  // Create product size endpoint
  app.post("/api/product-sizes", async (req: Request, res: Response) => {
    try {
      const size = await storage.createProductSize(req.body);
      res.status(201).json(size);
    } catch (error) {
      console.error("Error creating product size:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product size" 
      });
    }
  });

  // Create product availability endpoint
  app.post("/api/product-availability", async (req: Request, res: Response) => {
    try {
      const availability = await storage.createProductAvailability(req.body);
      res.status(201).json(availability);
    } catch (error) {
      console.error("Error creating product availability:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product availability" 
      });
    }
  });

  // Send email route
  app.post("/api/send-email", async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
      }

      // TODO: Implement sendEmail function
      // await sendEmail(name, email, message);
      res.json({ success: true, message: "Email inviata con successo" });
    } catch (error) {
      console.error("Errore invio email:", error);
      res.status(500).json({ error: "Errore interno del server" });
    }
  });

  // Sync images route
  app.post("/api/sync-images", async (req: Request, res: Response) => {
    try {
      console.log("🔄 Richiesta sincronizzazione immagini...");
      const result = await syncAllImages();

      res.json({ 
        success: true, 
        message: "Sincronizzazione completata",
        ...result
      });
    } catch (error) {
      console.error("Errore sincronizzazione immagini:", error);
      res.status(500).json({ error: "Errore durante la sincronizzazione" });
    }
  });

  // ========== USER FAVORITES API ROUTES ==========

  // Add product to favorites
  app.post("/api/favorites", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      // Check if already favorited
      const isAlreadyFavorite = await storage.isProductFavorite(userId, productId);
      if (isAlreadyFavorite) {
        return res.status(409).json({ 
          success: false, 
          message: "Product is already in favorites" 
        });
      }

      const favorite = await storage.addToFavorites(userId, productId);
      res.status(201).json({ 
        success: true, 
        message: "Product added to favorites successfully",
        favorite 
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to add product to favorites" 
      });
    }
  });

  // Remove product from favorites
  app.delete("/api/favorites", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      await storage.removeFromFavorites(userId, productId);
      res.json({ 
        success: true, 
        message: "Product removed from favorites successfully" 
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to remove product from favorites" 
      });
    }
  });

  // Get user's favorite products
  app.get("/api/favorites/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId is required" 
        });
      }

      const favorites = await storage.getUserFavorites(parseInt(userId));
      res.json({ 
        success: true, 
        favorites 
      });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch favorites" 
      });
    }
  });

  // Check if product is favorited by user
  app.get("/api/favorites/:userId/:productId", async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.params;

      if (!userId || !productId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId are required" 
        });
      }

      // Validate that productId is numeric
      const numericProductId = parseInt(productId);
      const numericUserId = parseInt(userId);

      if (isNaN(numericProductId) || isNaN(numericUserId)) {
        return res.status(400).json({ 
          success: false, 
          message: "userId and productId must be valid numbers" 
        });
      }

      const isFavorite = await storage.isProductFavorite(numericUserId, numericProductId);
      res.json({ 
        success: true, 
        isFavorite 
      });
    } catch (error) {
      console.error("Error checking favorite status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check favorite status" 
      });
    }
  });

  // Clear all user favorites
  app.delete("/api/favorites/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          message: "userId is required" 
        });
      }

      await storage.clearUserFavorites(parseInt(userId));
      res.json({ 
        success: true, 
        message: "All favorites cleared successfully" 
      });
    } catch (error) {
      console.error("Error clearing favorites:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to clear favorites" 
      });
    }
  });

  // ========== PRODUCT SLUG MANAGEMENT API ROUTES ==========

  // Update product slug and create redirect from old slug
  app.put("/api/product/:id/slug", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { newSlug } = req.body;

      // Validate required fields
      if (!id || !newSlug) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID and newSlug are required" 
        });
      }

      // Validate that id is numeric
      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID must be a valid number" 
        });
      }

      // Validate slug format (basic validation)
      if (typeof newSlug !== 'string' || newSlug.trim() === '') {
        return res.status(400).json({ 
          success: false, 
          message: "newSlug must be a valid non-empty string" 
        });
      }

      // Clean the slug (remove special characters, make URL-friendly)
      const cleanSlug = newSlug.trim().toLowerCase()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      if (cleanSlug === '') {
        return res.status(400).json({ 
          success: false, 
          message: "newSlug contains only invalid characters" 
        });
      }

      // Update product slug and create redirect
      const result = await storage.updateProductSlug(numericId, cleanSlug);
      
      res.json({ 
        success: true, 
        message: "Product slug updated successfully and redirect created",
        oldSlug: result.oldSlug,
        newSlug: result.newSlug
      });
    } catch (error) {
      console.error("Error updating product slug:", error);
      
      // Handle specific error cases
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to update product slug" 
      });
    }
  });

  // ========== PRICE WATCHER API ROUTES ==========

  // Start automatic price watching
  app.post("/api/price-watcher/start", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, intervalMinutes = 2 } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      // Import PriceWatcher dynamically to avoid circular dependencies
      const { PriceWatcher } = await import('./priceWatcher');

      // Stop existing watcher if running
      if ((global as any).priceWatcher) {
        (global as any).priceWatcher.stop();
      }

      // Start new watcher
      (global as any).priceWatcher = new PriceWatcher(spreadsheetId);
      (global as any).priceWatcher.start(intervalMinutes);

      res.json({ 
        success: true, 
        message: `Price watcher started. Checking every ${intervalMinutes} minutes.`,
        spreadsheetId,
        intervalMinutes
      });
    } catch (error) {
      console.error("Error starting price watcher:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to start price watcher" 
      });
    }
  });

  // Stop automatic price watching
  app.post("/api/price-watcher/stop", async (req: Request, res: Response) => {
    try {
      if ((global as any).priceWatcher) {
        (global as any).priceWatcher.stop();
        (global as any).priceWatcher = null;

        res.json({ 
          success: true, 
          message: "Price watcher stopped successfully" 
        });
      } else {
        res.json({ 
          success: false, 
          message: "No price watcher is currently running" 
        });
      }
    } catch (error) {
      console.error("Error stopping price watcher:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to stop price watcher" 
      });
    }
  });

  // Get price watcher status
  app.get("/api/price-watcher/status", async (req: Request, res: Response) => {
    try {
      const isActive = (global as any).priceWatcher ? (global as any).priceWatcher.isActive() : false;

      res.json({ 
        success: true, 
        isActive,
        message: isActive ? "Price watcher is running" : "Price watcher is stopped"
      });
    } catch (error) {
      console.error("Error checking price watcher status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check price watcher status" 
      });
    }
  });

  // Debug Google Sheets content
  app.post("/api/price-watcher/debug-sheets", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, sheetName = 'Prezzi Prodotti' } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      const { PriceWatcher } = await import('./priceWatcher');
      const watcher = new PriceWatcher(spreadsheetId, sheetName);

      // Leggi direttamente dal Google Sheets
      const auth = await watcher.authenticate();
      const { google } = await import('googleapis');
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${sheetName}'!A:G`,
      });

      const rows = response.data.values;

      res.json({ 
        success: true,
        data: {
          totalRows: rows ? rows.length : 0,
          headers: rows ? rows[0] : null,
          firstFewRows: rows ? rows.slice(1, 6) : [],
          lastModified: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Error debugging Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to debug Google Sheets",
        error: (error as Error).message || String(error)
      });
    }
  });

  // Sync database to Google Sheets
  app.post("/api/price-watcher/sync-to-sheets", async (req: Request, res: Response) => {
    try {
      const { spreadsheetId, sheetName = 'Prezzi Prodotti' } = req.body;

      if (!spreadsheetId) {
        return res.status(400).json({ 
          success: false, 
          message: "spreadsheetId is required" 
        });
      }

      const { PriceWatcher } = await import('./priceWatcher');
      const watcher = new PriceWatcher(spreadsheetId, sheetName);

      // Esegui sincronizzazione completa dal database al Google Sheets
      await watcher.syncDatabaseToGoogleSheets();

      res.json({ 
        success: true,
        message: "Database synchronized to Google Sheets successfully"
      });
    } catch (error) {
      console.error("Error syncing to Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to sync to Google Sheets",
        error: (error as Error).message || String(error)
      });
    }
  });

  // ================================
  // AUTHENTICATION GATE ENDPOINTS
  // ================================

  // Credenziali hardcoded per accesso privato
  const VALID_CREDENTIALS = [
    { username: 'biggimmy', password: 'XNCahKl09P!298Gq20LkAns!1' },
    { username: 'andrea', password: 'So347291Pa21Jkaò!ksi=p0!' }
  ];

  // Login endpoint aggiornato: supporta anche email/password per login clienti (session-only)
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      const code = String((req.body || {}).code ?? (req.body || {}).password ?? "");
      if (typeof code === "string" && code.length > 0) {
        if (code !== ADMIN_CODE) {
          return res.status(401).json({ success: false, message: "Codice non valido" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const now = new Date().toISOString();
        let sessionUserId: any = Date.now();
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (client) {
          try {
            const { data } = await (client as any)
              .from("users")
              .select("id,email,first_name,last_name")
              .eq("email", adminEmail)
              .limit(1)
              .maybeSingle();
            if (data && data.id) {
              sessionUserId = String(data.id);
            } else {
              const newId = crypto.randomUUID();
              await (client as any)
                .from("users")
                .insert({ id: newId, email: adminEmail, created_at: now, updated_at: now, first_name: "Admin", last_name: "User" });
              sessionUserId = newId;
            }
          } catch {}
        }
        (req.session as any).user = {
          id: sessionUserId,
          email: adminEmail,
          authenticated: true,
          isAdmin: true,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: "Admin",
          lastName: "User",
        };
        return res.json({ success: true, message: "Login effettuato con successo", user: { email: adminEmail } });
      }
      // Login clienti via email/password (DB utenti)
      const { email, password } = req.body || {};
      if (email) {
        if (!password) {
          return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
        }
        if (!req.session) {
          console.error('❌ Sessione non inizializzata');
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (!client) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { data } = await (client as any)
          .from("users")
          .select("id,email,first_name,last_name,is_admin,password")
          .eq("email", email)
          .limit(1)
          .maybeSingle();
        if (!data || !data.id || String(data.password) !== String(password)) {
          return res.status(401).json({ success: false, message: "Credenziali non valide" });
        }
        const now = new Date().toISOString();
        (req.session as any).user = {
          id: String(data.id),
          email: String(data.email),
          authenticated: true,
          isAdmin: !!data.is_admin,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: data.first_name,
          lastName: data.last_name,
        };
        return res.json({ success: true, message: "Login effettuato con successo", user: { email, isAdmin: !!data.is_admin } });
      }

      // ... existing code ...
      const { username, password: pwd } = req.body;
      if (username || pwd) {
        return res.status(401).json({ success: false, message: "Login via username/password disabilitato" });
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      res.status(500).json({ 
        success: false, 
        message: "Errore interno del server" 
      });
    }
  });

  // NEW: Current user endpoint compatibile con il client
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const session = req.session as any;
      const user = session?.user;

      if (user && user.authenticated) {
        const userPayload = {
          id: user.id ?? 0,
          email: user.email ?? (user.username ? `${user.username}@local` : undefined),
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          province: user.province,
          country: user.country,
          createdAt: user.createdAt ?? user.loginTime ?? new Date().toISOString(),
          updatedAt: user.updatedAt ?? new Date().toISOString(),
          username: user.username,
          isAdmin: !!user.isAdmin,
        };
        return res.json({ success: true, authenticated: true, user: userPayload });
      }

      return res.json({ success: true, authenticated: false });
    } catch (error) {
      console.error("Errore durante /api/auth/me:", error);
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("❌ Errore durante la distruzione della sessione:", err);
          return res.status(500).json({
            success: false,
            message: "Errore durante il logout",
          });
        }
        console.log("✅ Logout effettuato con successo");
        return res.json({
          success: true,
          message: "Logout effettuato con successo",
        });
      });
    } else {
      // Nessuna sessione trovata
      return res.status(200).json({
        success: true,
        message: "Nessuna sessione attiva",
      });
    }
  } catch (error) {
    console.error("Errore durante il logout:", error);
    res.status(500).json({
      success: false,
      message: "Errore interno del server",
    });
  }
});


  // NEW: Registrazione cliente (session-only, no DB)
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone, address, city, postalCode, province, country } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
      }
      if (!req.session) {
        return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
      }
      const now = new Date().toISOString();
      (req.session as any).user = {
        id: Date.now(),
        email,
        authenticated: true,
        createdAt: now,
        updatedAt: now,
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        province,
        country,
      };
      return res.json({
        success: true,
        message: "Registrazione effettuata con successo",
        user: (req.session as any).user,
      });
    } catch (error) {
      console.error("Errore durante /api/auth/register:", error);
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName } = req.body || {};
      if (!email) {
        return res.status(400).json({ success: false, message: "Email obbligatoria" });
      }
      const now = new Date().toISOString();
      const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
      if (!client) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { data } = await (client as any)
        .from("users")
        .select("id")
        .eq("email", email)
        .limit(1)
        .maybeSingle();
      if (data && data.id) {
        return res.json({ success: true, user: { id: String(data.id), email } });
      }
      const newId = crypto.randomUUID();
      const { error } = await (client as any)
        .from("users")
        .insert({ id: newId, email, first_name: firstName, last_name: lastName, created_at: now, updated_at: now });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true, user: { id: newId, email } });
    } catch {
      return res.status(500).json({ success: false, message: "Errore registrazione" });
    }
  });

  // NEW: Aggiornamento profilo cliente (session-only)
  app.put("/api/auth/profile", async (req: Request, res: Response) => {
    try {
      if (!req.session || !(req.session as any).user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const allowed = ["firstName","lastName","phone","address","city","postalCode","province","country"];
      const updates: Record<string, any> = {};
      for (const key of allowed) {
        if (key in req.body) updates[key] = req.body[key];
      }
      (req.session as any).user = {
        ...(req.session as any).user,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return res.json({ success: true, message: "Profilo aggiornato", user: (req.session as any).user });
    } catch (error) {
      console.error("Errore durante /api/auth/profile:", error);
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });

  async function buildCartItem(
      productId: number,
      variant: string,
      quantity: number,
      price: number
    ) {
      const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
      if (!product) {
        throw new Error("Product not found");
      }
      const [primaryImg] = await db
        .select()
        .from(productImages)
        .where(and(eq(productImages.productId, product.id), eq(productImages.isPrimary, true)))
        .limit(1);

      const imageUrl = primaryImg?.src
        ? (primaryImg.src.startsWith('/images/') || primaryImg.src.startsWith('/attached_assets/')
            ? primaryImg.src
            : `/images/products/${primaryImg.src}`)
        : undefined;

      return {
        id: productId.toString(),
        name: product.name,
        price: price,
        variant,
        quantity,
        image: imageUrl,
      };
    }

    // Carica carrello utente
    const supabaseAdmin = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      : null;
    const supabaseAnon = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
      ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
      : null;

    app.get("/api/cart/:userId", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        const { userId } = req.params;
        if (supabaseAdmin) {
          const { data, error } = await (supabaseAdmin as any).rpc("get_cart", { p_user_id: userId });
          if (error) return res.status(400).json({ success: false, error });
          return res.json({ success: true, items: data });
        } else {
          const items = sess.cart || [];
          return res.json({ success: true, items });
        }
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Alias: GET /api/cart senza userId → usa sessione corrente
    app.get("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        if (supabaseAdmin && user?.id) {
          const { data, error } = await (supabaseAdmin as any).rpc("get_cart", { p_user_id: String(user.id) });
          if (error) return res.status(400).json({ success: false, error });
          return res.json({ success: true, items: data });
        }
        const items = sess.cart || [];
        return res.json({ success: true, items });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Aggiungi al carrello
    app.post("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        console.log("DEBUG /api/cart POST body:", req.body);
        const { product_option_id, quantity, productId, variant, price } = req.body || {};

        if (supabaseAdmin) {
          const poid = Number(product_option_id);
          const qty = Number(quantity);
          if (Number.isFinite(poid) && poid > 0 && Number.isFinite(qty) && qty > 0) {
            const { error } = await (supabaseAdmin as any).rpc("add_to_cart", {
              p_product_option_id: poid,
              p_quantity: qty,
              p_user_id: String(user.id),
            });
            if (error) return res.status(400).json({ success: false, error });
            return res.json({ success: true });
          }

          const pid = Number(productId);
          const vstr = typeof variant === "string" ? variant : "";
          if (Number.isFinite(pid) && pid > 0 && vstr.length > 0 && Number.isFinite(qty) && qty > 0) {
            try {
              const { data, error } = await (supabaseAdmin as any)
                .from("product_options")
                .select("id, flavor, size, product_id")
                .eq("product_id", pid);
              if (error) return res.status(400).json({ success: false, error });
              const match = Array.isArray(data) ? data.find((o: any) => {
                const disp = `${(o.flavor ?? '').toString()} ${(o.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
                return disp === vstr.replace(/Unico/gi, '').trim();
              }) : null;
              const resolvedId = match ? Number(match.id) : NaN;
              if (!Number.isFinite(resolvedId) || resolvedId <= 0) {
                return res.status(400).json({ success: false, message: "Parametri non validi" });
              }
              const { error: err2 } = await (supabaseAdmin as any).rpc("add_to_cart", {
                p_product_option_id: resolvedId,
                p_quantity: qty,
                p_user_id: String(user.id),
              });
              if (err2) return res.status(400).json({ success: false, error: err2 });
              return res.json({ success: true });
            } catch (e) {
              return res.status(500).json({ success: false, message: "Errore interno del server" });
            }
          }
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        if (supabaseAnon) {
          const poid = Number(product_option_id);
          const qty = Number(quantity);
          if (Number.isFinite(poid) && poid > 0 && Number.isFinite(qty) && qty > 0) {
            // Try RPC with anon
            const rpcRes = await (supabaseAnon as any).rpc("add_to_cart", {
              p_product_option_id: poid,
              p_quantity: qty,
              p_user_id: String(user.id),
            });
            if (!rpcRes.error) return res.json({ success: true });

            // Fallback: direct upsert into cart_items if policies allow
            const { error: upErr } = await (supabaseAnon as any)
              .from("cart_items")
              .upsert({ user_id: String(user.id), product_option_id: poid, quantity: qty }, { onConflict: "user_id,product_option_id" });
            if (!upErr) return res.json({ success: true });
          }
        }

        // Session fallback: support both product_option_id and productId+variant shapes
        const poidSess = Number(product_option_id);
        const qtySess = Number(quantity);
        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];

        if (Number.isFinite(poidSess) && poidSess > 0 && Number.isFinite(qtySess) && qtySess > 0) {
          const idxByOption = current.findIndex(i => Number(i.product_option_id) === poidSess);
          if (idxByOption >= 0) {
            current[idxByOption] = { ...current[idxByOption], quantity: qtySess };
            sess.cart = current;
            return res.json({ success: true, items: current });
          }
          if (supabaseAnon) {
            const { data } = await (supabaseAnon as any)
              .from("product_options")
              .select("id, flavor, size, product_id, price_cents, image")
              .eq("id", poidSess)
              .limit(1)
              .maybeSingle();
            if (data && data.product_id) {
              let nameVal = "";
              try {
                const { data: prod } = await (supabaseAnon as any)
                  .from("products")
                  .select("name")
                  .eq("id", data.product_id)
                  .limit(1)
                  .maybeSingle();
                if (prod && prod.name) nameVal = String(prod.name);
              } catch {}
              const variantStr = `${(data.flavor ?? '').toString()} ${(data.size ?? '').toString()}`.replace(/Unico/gi, '').trim();
              const priceVal = typeof data.price_cents === "number" ? data.price_cents / 100 : 0;
              const imageUrl = data.image ?? "";
              const newItem = {
                id: String(data.product_id),
                name: nameVal,
                price: priceVal,
                variant: variantStr,
                quantity: qtySess,
                image: imageUrl,
                product_option_id: poidSess,
              };
              current.push(newItem);
              sess.cart = current;
              return res.json({ success: true, items: current });
            }
          }
        }

        if (!productId || !variant || !quantity || typeof price !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        const newItem = await buildCartItem(parseInt(productId), String(variant), parseInt(quantity), price);
        const idx = current.findIndex(i => i.id === newItem.id && i.variant === newItem.variant);
        if (idx >= 0) {
          current[idx] = { ...current[idx], quantity: current[idx].quantity + newItem.quantity };
        } else {
          current.push({ ...newItem, product_option_id: Number.isFinite(poidSess) && poidSess > 0 ? poidSess : undefined });
        }
        sess.cart = current;
        return res.json({ success: true, items: current });
      } catch (error: any) {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Aggiorna quantità
    app.put("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        console.log("DEBUG /api/cart PUT body:", req.body);

        const { product_option_id, quantity, productId, variant } = req.body || {};

        if (typeof product_option_id === "number" && typeof quantity === "number") {
          if (!supabaseAdmin) {
            // Fallback session update by product_option_id o id
            let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];
            const poidNum = Number(product_option_id);
            let idxByOption = current.findIndex(i => Number(i.product_option_id) === poidNum);
            if (idxByOption < 0) {
              idxByOption = current.findIndex(i => String(i.id) === String(product_option_id));
            }
            if (idxByOption >= 0) {
              if (quantity <= 0) {
                current = current.filter((_, i) => i !== idxByOption);
              } else {
                const updated = { ...current[idxByOption], quantity: Number(quantity), product_option_id: poidNum };
                current[idxByOption] = updated;
              }
              sess.cart = current;
              return res.status(200).json({ success: true, items: current });
            }
            // Not found → proceed a productId+variant path sotto
          } else {
            const { error } = await (supabaseAdmin as any).rpc("update_cart_quantity", {
              p_product_option_id: product_option_id,
              p_quantity: quantity,
              p_user_id: String(user.id),
            });
            if (error) {
              console.error("Errore update cart_items su Supabase", error);
              return res.status(500).json({ success: false, message: "Errore aggiornamento carrello (DB)" });
            }
            return res.status(200).json({ success: true });
          }
        }

        if (!productId || typeof quantity !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];
        const idx = current.findIndex(i => {
          const idMatch = i.id === String(productId);
          if (typeof variant === "string" && variant.length > 0) {
            return idMatch && i.variant === String(variant);
          }
          return idMatch;
        });
        if (idx < 0) {
          return res.status(404).json({ success: false, message: "Item non trovato" });
        }
        if (quantity <= 0) {
          current = current.filter((_, i) => i !== idx);
        } else {
          current[idx] = { ...current[idx], quantity };
        }
        sess.cart = current;
        return res.json({ success: true, items: current });
      } catch (error) {
        console.error("Errore PUT /api/cart:", error);
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Rimuovi item dal carrello
    app.delete("/api/cart", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        const { product_option_id, productId, variant } = req.body || {};

        // Supabase path: rimozione per product_option_id
        if (supabaseAdmin && typeof product_option_id === "number" && product_option_id > 0) {
          const { error } = await (supabaseAdmin as any).rpc("remove_from_cart", {
            p_product_option_id: product_option_id,
            p_user_id: String(user.id),
          });
          if (error) {
            console.error("Errore remove cart_items su Supabase", error);
            return res.status(500).json({ success: false, message: "Errore rimozione carrello (DB)" });
          }
          return res.json({ success: true });
        }

        if (!supabaseAdmin && supabaseAnon && typeof product_option_id === "number" && product_option_id > 0) {
          const { error } = await (supabaseAnon as any)
            .from("cart_items")
            .delete()
            .eq("user_id", String(user.id))
            .eq("product_option_id", Number(product_option_id));
          if (!error) return res.json({ success: true });
        }

        // Session fallback: support product_option_id or productId + variant
        let current: any[] = Array.isArray(sess.cart) ? [...sess.cart] : [];

        if (typeof product_option_id === "number" && product_option_id > 0) {
          const next = current.filter(i => Number(i.product_option_id) !== Number(product_option_id));
          sess.cart = next;
          return res.json({ success: true, items: next });
        }

        if (!productId) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }

        const next = current.filter(i => {
          const idMatch = i.id === String(productId);
          if (typeof variant === "string" && variant.length > 0) {
            return !(idMatch && i.variant === String(variant));
          }
          return !idMatch;
        });
        sess.cart = next;
        return res.json({ success: true, items: next });
      } catch {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    // Svuota carrello utente
    app.delete("/api/cart/:userId", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }
        const { userId } = req.params;
        if (supabaseAdmin) {
          const { error } = await (supabaseAdmin as any).rpc("clear_cart", { p_user_id: userId });
          if (error) return res.status(400).json({ success: false, error });
          return res.json({ success: true });
        }
        sess.cart = [];
        return res.json({ success: true, items: [] });
      } catch {
        return res.status(500).json({ success: false, message: "Errore interno del server" });
      }
    });

    

    app.get("/api/cart-db/:userId", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { userId } = req.params;
        const { data, error } = await (supabaseAdmin as any).rpc("get_cart", { p_user_id: userId });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true, items: data });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore caricamento carrello" });
      }
    });

    app.post("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id, quantity } = req.body || {};
        if (!product_option_id || !quantity) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("add_to_cart", {
          p_product_option_id: product_option_id,
          p_quantity: quantity,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore aggiunta carrello" });
      }
    });

    app.put("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id, quantity } = req.body || {};
        if (!product_option_id || typeof quantity !== "number") {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("update_cart_quantity", {
          p_product_option_id: product_option_id,
          p_quantity: quantity,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore aggiornamento carrello" });
      }
    });

    app.delete("/api/cart-db", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { product_option_id } = req.body || {};
        if (!product_option_id) {
          return res.status(400).json({ success: false, message: "Parametri non validi" });
        }
        const sess = req.session as any;
        const userId = sess?.user?.id;
        const { error } = await (supabaseAdmin as any).rpc("remove_from_cart", {
          p_product_option_id: product_option_id,
          ...(userId ? { p_user_id: userId } : {}),
        });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore rimozione carrello" });
      }
    });

    app.delete("/api/cart-db/:userId", async (req: Request, res: Response) => {
      try {
        if (!supabaseAdmin) {
          return res.status(500).json({ success: false, message: "Supabase non configurato" });
        }
        const { userId } = req.params;
        const { error } = await (supabaseAdmin as any).rpc("clear_cart", { p_user_id: userId });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore svuotamento carrello" });
      }
    });

    app.post("/api/checkout", async (req: Request, res: Response) => {
      try {
        const sess = req.session as any;
        const user = sess?.user;
        if (!user?.authenticated) {
          return res.status(401).json({ success: false, message: "Non autenticato" });
        }

        let items: any[] = [];
        if (supabaseAdmin && user?.id) {
          const { data, error } = await (supabaseAdmin as any).rpc("get_cart", { p_user_id: String(user.id) });
          if (error) return res.status(400).json({ success: false, error });
          items = Array.isArray(data) ? data : [];
        } else {
          items = Array.isArray(sess.cart) ? sess.cart : [];
        }
        if (!items.length) {
          return res.status(400).json({ success: false, message: "Carrello vuoto" });
        }

        const secret = process.env.STRIPE_SECRET_KEY;
        const successUrl = process.env.CHECKOUT_SUCCESS_URL || "http://localhost:5000/success";
        const cancelUrl = process.env.CHECKOUT_CANCEL_URL || "http://localhost:5000/cancel";
        if (!secret) {
          console.error("Checkout error: STRIPE_SECRET_KEY mancante");
          return res.status(500).json({ success: false, message: "Stripe non configurato" });
        }

        console.log("Checkout env check:", { hasSecret: !!secret, successUrl, cancelUrl });

        const stripe = new Stripe(secret as string);

        const line_items = items.map((i) => {
          const priceCents = typeof i.price_cents === "number" ? i.price_cents : Math.round(Number(i.price) * 100);
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: `${String(i.name ?? '')} — ${String(i.variant ?? '')}`.trim(),
                images: i.image ? [i.image] : [],
              },
              unit_amount: priceCents,
            },
            quantity: Number(i.quantity),
          };
        });

        const sessionStripe = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items,
          success_url: successUrl,
          cancel_url: cancelUrl,
        });

        return res.json({ success: true, url: sessionStripe.url });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Errore creazione checkout" });
      }
    });

  const httpServer = createServer(app);

  return httpServer;
}
