import { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendAdminNotification, sendUserConfirmation, sendPersonalizedReply } from './services/email.ts';
import { syncAllImages } from "./utils/imageSync.ts";
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

export async function registerRoutes(app: Express): Promise<Server> {

  // ================================
  // SESSION CONFIGURATION
  // ================================
  
  console.log('🔧 Configurazione middleware di sessione con PostgreSQL...');
  
  const pgSession = connectPgSimple(session);
  
  app.use(session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      tableName: 'session', // Nome tabella per le sessioni
      createTableIfMissing: true, // Crea automaticamente la tabella se non esiste
    }),
    secret: process.env.SESSION_SECRET || 'big-gimmy-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 giorni
      secure: false, // true solo in produzione con HTTPS
      httpOnly: true, // Sicurezza: cookie non accessibile da JavaScript
      sameSite: 'lax' // Protezione CSRF
    },
    rolling: true, // Rinnova il cookie ad ogni richiesta
    name: 'biggimmy-session'
  }));
  
  console.log('✅ Middleware di sessione PostgreSQL configurato');

  // put application routes here
  // prefix all routes with /api

  // Endpoint per l'invio di email personalizzate da parte del team
  app.post('/api/send-reply', async (req: Request, res: Response) => {
    try {
      const { recipientEmail, recipientName, subject, message } = req.body;

      // Validazione dei dati
      if (!recipientEmail || !recipientName || !subject || !message) {
        return res.status(400).json({ 
          error: 'Tutti i campi sono obbligatori (recipientEmail, recipientName, subject, message)' 
        });
      }

      // Invio dell'email personalizzata
      const emailSent = await sendPersonalizedReply(recipientEmail, recipientName, subject, message);

      res.json({
        success: true,
        message: 'Email di risposta personalizzata inviata con successo',
        emailSent
      });
    } catch (error) {
      console.error('Errore nell\'invio dell\'email personalizzata:', error);
      res.status(500).json({ 
        error: 'Errore interno del server durante l\'invio dell\'email personalizzata' 
      });
    }
  });

  // Endpoint per l'invio del form di contatto
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);

      // Save the contact in storage
      const contact = await storage.createContact(contactData);

      // Send notification email to admin
      const adminEmailSent = await sendAdminNotification({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || undefined,
        message: contactData.message
      });

      // Send confirmation email to user
      const userEmailSent = await sendUserConfirmation({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || undefined,
        message: contactData.message
      });

      // Return success response
      return res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        data: contact,
        emailStatus: {
          adminNotified: adminEmailSent,
          userConfirmationSent: userEmailSent,
          simulationMode: false
        }
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }

      // Handle other errors
      return res.status(500).json({ 
        success: false, 
        message: "Server error, please try again later" 
      });
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

      // Set cache headers for real-time price updates
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
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=1800', // Nessun cache - aggiornamenti istantanei
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
      
      // Get product options from database
      const options = await storage.getProductOptionsById(product.id);
      
      // Convert to ProductVariant format (price in euros)
      const variants = options.map(option => ({
        flavor: option.flavor || "",
        size: option.size || "",
        price: option.priceCents / 100, // Convert cents to euros
        originalPrice: option.originalPriceCents ? option.originalPriceCents / 100 : undefined,
        image: option.image || "",
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
        range: `'${sheetName}'!A:F`,
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

  // Login endpoint automatico (bypass autenticazione)
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Crea sessione utente autenticato automaticamente come biggimmy
      if (req.session) {
        (req.session as any).user = {
          username: 'biggimmy',
          authenticated: true,
          loginTime: new Date().toISOString()
        };
      }

      console.log(`✅ Login automatico come biggimmy`);
      
      res.json({ 
        success: true, 
        message: "Login effettuato con successo",
        user: { username: 'biggimmy' }
      });
    } catch (error) {
      console.error("Errore durante il login:", error);
      res.status(500).json({ 
        success: false, 
        message: "Errore interno del server" 
      });
    }
  });

  // Logout endpoint (non fa nulla, sempre autenticato)
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      // Non distrugge la sessione, rimane sempre autenticato
      console.log("✅ Richiesta di logout ricevuta (ignorata, sempre autenticato)");
      res.json({ 
        success: true, 
        message: "Logout effettuato con successo" 
      });
    } catch (error) {
      console.error("Errore durante il logout:", error);
      res.status(500).json({ 
        success: false, 
        message: "Errore interno del server" 
      });
    }
  });

  // Check authentication status (sempre autenticato)
  app.get("/api/auth/check", async (req: Request, res: Response) => {
    try {
      // Sempre autenticato come biggimmy
      res.json({ 
        success: true, 
        authenticated: true,
        user: { username: 'biggimmy', loginTime: new Date().toISOString() }
      });
    } catch (error) {
      console.error("Errore durante il controllo autenticazione:", error);
      res.status(500).json({ 
        success: false, 
        message: "Errore interno del server" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}