import { 
  users, type User, type InsertUser, 
  contacts, type Contact, type InsertContact,
  products, type Product as DBProduct, type InsertProduct,
  productGroups, type ProductGroup, type InsertProductGroup,
  productCategories, type ProductCategory, type InsertProductCategory,
  brands, type Brand, type InsertBrand,
  productImages, type ProductImage, type InsertProductImage,
  productSizes, type ProductSize, type InsertProductSize,
  productAvailability, type ProductAvailability, type InsertProductAvailability,
  userFavorites, type UserFavorite, type InsertUserFavorite,
  productOptions, type ProductOption, type InsertProductOption,
  productSlugRedirects, type ProductSlugRedirect, type InsertProductSlugRedirect
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: any): Promise<any>;
  getContacts(): Promise<any[]>;

  
  // Product management
  getAllProducts(): Promise<DBProduct[]>;
  searchProducts(searchQuery?: string, filters?: {
    brandSlug?: string;
    categorySlug?: string;
    priceRange?: string;
    sortBy?: string;
  }): Promise<DBProduct[]>;
  getProductsByCategory(categorySlug: string): Promise<DBProduct[]>;
  getProductGroupsByCategory(categorySlug: string): Promise<any[]>;
  getBaseProductsByCategory(categorySlug: string): Promise<any[]>;
  getProductVariants(baseProductSlug: string): Promise<any[]>;
  getProductBySlug(slug: string): Promise<DBProduct | undefined>;
  getProductBySlugWithDetails(slug: string): Promise<any>;
  getProductGroupBySlug(slug: string): Promise<any>;
  createProduct(product: InsertProduct): Promise<DBProduct>;
  createProductGroup(group: InsertProductGroup): Promise<ProductGroup>;
  
  // Category management  
  getCategories(): Promise<ProductCategory[]>;
  getCategoryBySlug(slug: string): Promise<ProductCategory | undefined>;
  createCategory(category: InsertProductCategory): Promise<ProductCategory>;
  
  // Brand management
  getBrands(): Promise<Brand[]>;
  getBrandsFilteredByContext(filters?: {
    categorySlug?: string;
    searchQuery?: string;
  }): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  // Product images management
  createProductImage(image: InsertProductImage): Promise<ProductImage>;
  
  // Product sizes management
  createProductSize(size: InsertProductSize): Promise<ProductSize>;
  
  // Product availability management
  createProductAvailability(availability: InsertProductAvailability): Promise<ProductAvailability>;
  
  // User favorites management
  addToFavorites(userId: number, productId: number): Promise<UserFavorite>;
  removeFromFavorites(userId: number, productId: number): Promise<void>;
  getUserFavorites(userId: number): Promise<DBProduct[]>;
  isProductFavorite(userId: number, productId: number): Promise<boolean>;
  clearUserFavorites(userId: number): Promise<void>;
  
  // Product options management (variants with prices)
  getProductOptionsById(productId: number): Promise<ProductOption[]>;
  getProductOptionsBySlug(slug: string): Promise<any[]>; // Returns ProductVariant[] compatible format
  createProductOption(option: InsertProductOption): Promise<ProductOption>;
  listProductsWithMinPrice(): Promise<any[]>; // Returns products with computed min_price_cents

  // Product slug redirects management
  createSlugRedirect(redirect: InsertProductSlugRedirect): Promise<ProductSlugRedirect>;
  findRedirectByOldSlug(oldSlug: string): Promise<ProductSlugRedirect | undefined>;
  updateProductSlug(productId: number, newSlug: string): Promise<{ oldSlug: string; newSlug: string }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  userCurrentId: number;
  contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt,
      phone: insertContact.phone || null 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Product management - placeholder methods
  async getAllProducts(): Promise<DBProduct[]> {
    return [];
  }

  async searchProducts(searchQuery?: string, filters?: {
    brandSlug?: string;
    categorySlug?: string;
    priceRange?: string;
    sortBy?: string;
  }): Promise<DBProduct[]> {
    return [];
  }

  async getProductsByCategory(categorySlug: string): Promise<DBProduct[]> {
    return [];
  }

  async getProductBySlug(slug: string): Promise<DBProduct | undefined> {
    const result = await db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        description: products.description,
        longDescription: products.longDescription,
        brandId: products.brandId,
        categoryId: products.categoryId,
        groupId: products.groupId,
        flavor: products.flavor,
        size: products.size,
        quantity: products.quantity,
        isNew: products.isNew,
        isBestSeller: products.isBestSeller,
        hasSpecialOffer: products.hasSpecialOffer,
        hasCreapure: products.hasCreapure,
        specialOfferText: products.specialOfferText,
        features: products.features,
        howToUse: products.howToUse,
        warnings: products.warnings,
        brand_name: brands.name,
        category_name: productCategories.name,
        category_slug: productCategories.slug,
        primaryimage: productImages.src
      })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .innerJoin(productCategories, eq(products.categoryId, productCategories.id))
      .leftJoin(productImages, and(
        eq(products.id, productImages.productId),
        eq(productImages.isPrimary, true)
      ))
      .where(eq(products.slug, slug))
      .limit(1);
    
    const product = result[0];
    if (!product) return undefined;
    
    const imageUrl = product.primaryimage ? (
      product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/')
        ? product.primaryimage
        : `/images/products/${product.primaryimage}`
    ) : undefined;
    
    return {
      ...product,
      primaryImage: imageUrl,
      image_url: imageUrl
    } as any;
  }

  async getProductBySlugWithDetails(slug: string): Promise<any> {
    return this.getProductBySlug(slug);
  }

  async createProduct(product: InsertProduct): Promise<DBProduct> {
    throw new Error("Not implemented");
  }

  // Category management - placeholder methods
  async getCategories(): Promise<ProductCategory[]> {
    return [];
  }

  async getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
    return undefined;
  }

  async createCategory(category: InsertProductCategory): Promise<ProductCategory> {
    throw new Error("Not implemented");
  }

  // Brand management - placeholder methods
  async getBrands(): Promise<Brand[]> {
    return [];
  }

  async getBrandsFilteredByContext(filters?: {
    categorySlug?: string;
    searchQuery?: string;
  }): Promise<Brand[]> {
    return [];
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return undefined;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    throw new Error("Not implemented");
  }

  async getProductGroupsByCategory(categorySlug: string): Promise<any[]> {
    return [];
  }

  async getBaseProductsByCategory(categorySlug: string): Promise<any[]> {
    return [];
  }

  async getProductVariants(baseProductSlug: string): Promise<any[]> {
    return [];
  }

  async getProductGroupBySlug(slug: string): Promise<any> {
    return undefined;
  }

  async createProductGroup(group: InsertProductGroup): Promise<ProductGroup> {
    throw new Error("Not implemented");
  }

  async createProductImage(image: InsertProductImage): Promise<ProductImage> {
    throw new Error("Not implemented");
  }

  async createProductSize(size: InsertProductSize): Promise<ProductSize> {
    throw new Error("Not implemented");
  }

  async createProductAvailability(availability: InsertProductAvailability): Promise<ProductAvailability> {
    throw new Error("Not implemented");
  }

  // User favorites management - placeholder implementations
  async addToFavorites(userId: number, productId: number): Promise<UserFavorite> {
    throw new Error("Not implemented");
  }

  async removeFromFavorites(userId: number, productId: number): Promise<void> {
    throw new Error("Not implemented");
  }

  async getUserFavorites(userId: number): Promise<DBProduct[]> {
    return [];
  }

  async isProductFavorite(userId: number, productId: number): Promise<boolean> {
    return false;
  }

  async clearUserFavorites(userId: number): Promise<void> {
    // Not implemented
  }
  
  // Product options management - placeholder implementations  
  async getProductOptionsById(productId: number): Promise<ProductOption[]> {
    return [];
  }

  async getProductOptionsBySlug(slug: string): Promise<any[]> {
    return [];
  }

  async createProductOption(option: InsertProductOption): Promise<ProductOption> {
    throw new Error("Not implemented");
  }

  async listProductsWithMinPrice(): Promise<any[]> {
    return [];
  }

  // Product slug redirects management - placeholder implementations
  async createSlugRedirect(redirect: InsertProductSlugRedirect): Promise<ProductSlugRedirect> {
    throw new Error("Not implemented");
  }

  async findRedirectByOldSlug(oldSlug: string): Promise<ProductSlugRedirect | undefined> {
    return undefined;
  }

  async updateProductSlug(productId: number, newSlug: string): Promise<{ oldSlug: string; newSlug: string }> {
    throw new Error("Not implemented");
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  // Product management
  async getAllProducts(): Promise<DBProduct[]> {
    // Ottengo tutti i prodotti dal database raggruppati per varianti usando product_options per prezzi
    const result = await db.execute(sql`
      SELECT p.*, b.name as brand_name, pc.name as category_name, pc.slug as category_slug,
             po_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price_cents) as price
        FROM product_options 
        WHERE price_cents > 0
        GROUP BY product_id
      ) po_min ON p.id = po_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
      ORDER BY p.name ASC, p.id ASC
    `);
    
    // Raggruppo i prodotti per gestire le varianti
    const groupedProducts = new Map();
    const products = result.rows as any[];
    
    console.log(`🔧 Inizio raggruppamento di ${products.length} prodotti totali`);
    
    for (const product of products) {
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      
      if (!groupedProducts.has(key)) {
        // Primo prodotto del gruppo - diventa il prodotto principale
        groupedProducts.set(key, {
          ...product,
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents,
          primaryImage: product.primaryimage ? (
            product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/') 
              ? product.primaryimage 
              : `/images/products/${product.primaryimage}`
          ) : undefined
        });
      } else {
        // Aggiorno il prezzo minimo del gruppo
        const group = groupedProducts.get(key);
        if (product.min_price_cents && product.min_price_cents > 0) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents; // Aggiorno il prezzo base per il frontend
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
        
        // Se il gruppo principale non ha primaryImage ma questa variante sì, usala
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/')
            ? product.primaryimage 
            : `/images/products/${product.primaryimage}`;
        }
      }
    }
    
    const finalProducts = Array.from(groupedProducts.values());
    console.log(`📦 Raggruppamento completato: ${products.length} → ${finalProducts.length} prodotti`);
    
    return finalProducts;
  }

  // Mappa di sinonimi: parola cercata → termini aggiuntivi da includere nella ricerca
  private readonly KEYWORD_ALIASES: Record<string, string[]> = {
    // Barrette
    "barrette":      ["bar", "barretta", "crispy", "protein bar"],
    "barretta":      ["bar", "barrette", "crispy", "protein bar"],
    // Proteine
    "proteine":      ["protein", "whey", "casein", "caseina", "isolate", "concentrate"],
    "proteina":      ["protein", "whey", "casein", "caseina"],
    "whey":          ["proteine", "protein", "siero"],
    // Creatina
    "creatina":      ["creatine", "creapure", "monohydrate", "monoidrato"],
    "creatine":      ["creatina", "creapure", "monohydrate"],
    // Aminoacidi
    "aminoacidi":    ["amino", "bcaa", "eaa", "aminoacido", "glutammina", "glutamine"],
    "aminoacido":    ["amino", "bcaa", "eaa", "aminoacidi"],
    "bcaa":          ["aminoacidi", "amino", "leucina", "leucine"],
    "eaa":           ["aminoacidi", "amino", "essential"],
    // Vitamine
    "vitamine":      ["vitamin", "vitamina", "multivitamin", "multivitaminico"],
    "vitamina":      ["vitamin", "vitamine", "multivitamin"],
    "vitamina c":    ["ascorbic", "ascorbico", "vitamin c"],
    "vitamina d":    ["vitamin d", "colecalciferolo"],
    // Minerali
    "magnesio":      ["magnesium", "mag"],
    "zinco":         ["zinc", "zn"],
    "ferro":         ["iron", "ferrum"],
    "calcio":        ["calcium", "ca"],
    "potassio":      ["potassium"],
    // Pre-workout / Energia
    "pre workout":   ["preworkout", "pre-workout", "energia", "energy", "caffeina", "caffeine", "booster"],
    "preworkout":    ["pre workout", "pre-workout", "energia", "energy", "booster"],
    "energia":       ["energy", "caffeina", "caffeine", "preworkout", "pre workout"],
    "caffeina":      ["caffeine", "energia", "energy", "coffee"],
    // Massa / Gainer
    "massa":         ["gainer", "mass", "weight gainer", "carboidrati"],
    "gainer":        ["massa", "mass", "weight", "carboidrati"],
    // Dimagrire / Fat burner
    "dimagrire":     ["fat burner", "fatburner", "diet", "dieta", "brucia grassi", "thermogenic"],
    "brucia grassi": ["fat burner", "thermogenic", "dimagrire", "diet"],
    "dieta":         ["diet", "dimagrire", "fat burner", "light"],
    // Omega / Fish oil
    "omega":         ["fish oil", "olio di pesce", "omega 3", "omega3", "epa", "dha"],
    "omega3":        ["omega 3", "fish oil", "olio di pesce", "epa", "dha"],
    // Collagene
    "collagene":     ["collagen", "collageno"],
    // Melatonina / Sonno
    "melatonina":    ["melatonin", "sonno", "sleep"],
    "sonno":         ["melatonina", "melatonin", "sleep", "relax"],
    // Articolazioni
    "articolazioni": ["joint", "glucosamina", "glucosamine", "condroitina", "chondroitin"],
    // Idratazione
    "idratazione":   ["isotonic", "isotonico", "sali minerali", "electrolyte", "elettroliti"],
    "sali minerali": ["electrolyte", "elettroliti", "idratazione", "isotonic"],
    // Snack
    "snack":         ["bar", "barretta", "barrette", "wafer", "biscuit", "biscotto", "cookie"],
  };

  private expandSearchTerms(query: string): string[] {
    const normalized = query.trim().toLowerCase();
    const terms = new Set<string>([normalized]);
    for (const [key, aliases] of Object.entries(this.KEYWORD_ALIASES)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        aliases.forEach(a => terms.add(a));
        terms.add(key);
      }
    }
    return Array.from(terms);
  }

  async searchProducts(searchQuery?: string, filters?: {
    brandSlug?: string;
    categorySlug?: string;
    priceRange?: string;
    sortBy?: string;
  }): Promise<DBProduct[]> {
    console.log(`🔍 searchProducts: Querying products with grouping (ricerca: "${searchQuery}", filtri: ${JSON.stringify(filters)})`);
    
    // Build ORDER BY clause
    let orderBy = 'p.name ASC, p.id ASC';
    if (filters?.sortBy === 'price-asc') {
      orderBy = 'min_price_cents ASC NULLS LAST';
    } else if (filters?.sortBy === 'price-desc') {
      orderBy = 'min_price_cents DESC NULLS LAST';
    } else if (filters?.sortBy === 'name-desc') {
      orderBy = 'p.name DESC';
    }
    
    // Build the query to get all products with their details (similar to getProductsByCategory)
    const baseQuery = sql`
      SELECT p.*, b.name as brand_name, b.slug as brand_slug, pc.name as category_name, pc.slug as category_slug,
             po_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price_cents) as price
        FROM product_options 
        WHERE price_cents > 0
        GROUP BY product_id
      ) po_min ON p.id = po_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
    `;
    
    // Add WHERE conditions
    const whereParts = [];
    if (filters?.categorySlug) {
      whereParts.push(sql`pc.slug = ${filters.categorySlug}`);
    }
    if (filters?.brandSlug) {
      whereParts.push(sql`b.slug = ${filters.brandSlug}`);
    }
    if (searchQuery && searchQuery.trim()) {
      const expandedTerms = this.expandSearchTerms(searchQuery);
      console.log(`🔑 Termini espansi per "${searchQuery}":`, expandedTerms);
      const termConditions = expandedTerms.map(term => {
        const like = `%${term}%`;
        return sql`(p.name ILIKE ${like} OR b.name ILIKE ${like} OR pc.name ILIKE ${like} OR pc.slug ILIKE ${like})`;
      });
      whereParts.push(sql`(${sql.join(termConditions, sql` OR `)})`);
    }
    
    // Build complete query
    const finalQuery = whereParts.length > 0 
      ? sql`${baseQuery} AND ${sql.join(whereParts, sql` AND `)} ORDER BY ${sql.raw(orderBy)}`
      : sql`${baseQuery} ORDER BY ${sql.raw(orderBy)}`;
    
    const result = await db.execute(finalQuery);
    const products = result.rows as any[];
    
    console.log(`🔧 Inizio raggruppamento di ${products.length} prodotti trovati`);
    
    // GROUP PRODUCTS BY VARIANTS (same logic as getProductsByCategory)
    const groupedProducts = new Map();
    
    for (const product of products) {
      // Use group_id if available, otherwise fallback to name-brand  
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      
      console.log(`🔍 Prodotto: ${product.slug}, group_id: ${product.group_id}, key: ${key}`);
      
      if (!groupedProducts.has(key)) {
        // First product of the group - becomes the main product
        groupedProducts.set(key, {
          ...product,
          variants: [product],
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents, // Add price for frontend
          primaryImage: product.primaryimage ? (
            product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/') 
              ? product.primaryimage 
              : `/images/products/${product.primaryimage}`
          ) : undefined,
          product_group_name: product.product_group_name // Preserve group name
        });
      } else {
        // Add as variant
        console.log(`🔗 Variante trovata per ${key}: ${product.slug}`);
        const group = groupedProducts.get(key);
        group.variants.push(product);
        
        // If main group doesn't have primaryImage but this variant does, use it
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/')
            ? product.primaryimage 
            : `/images/products/${product.primaryimage}`;
        }
        
        // Update price range
        if (product.min_price_cents) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents; // Also update base price for frontend
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
      }
    }
    
    const groupedArray = Array.from(groupedProducts.values()) as any[];
    console.log(`📦 Raggruppamento completato: ${products.length} → ${groupedArray.length} prodotti`);
    
    // Apply price range filter (post-grouping for accuracy)
    let filteredProducts = groupedArray;
    if (filters?.priceRange && filters.priceRange !== 'all') {
      filteredProducts = groupedArray.filter((group) => {
        // Use group's minimum price (price_range_min) for accurate filtering
        const priceInEuros = (group.price_range_min || 0) / 100;
        
        switch (filters.priceRange) {
          case '0-25':
            return priceInEuros <= 25;
          case '25-50':
            return priceInEuros >= 25 && priceInEuros <= 50;
          case '50-100':
            return priceInEuros >= 50 && priceInEuros <= 100;
          case '100+':
            return priceInEuros >= 100;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting after grouping (if price-based sorting is requested)
    if (filters?.sortBy === 'price-asc') {
      filteredProducts.sort((a, b) => {
        const priceA = a.price_range_min || 0;
        const priceB = b.price_range_min || 0;
        return priceA - priceB;
      });
    } else if (filters?.sortBy === 'price-desc') {
      filteredProducts.sort((a, b) => {
        const priceA = a.price_range_min || 0;
        const priceB = b.price_range_min || 0;
        return priceB - priceA;
      });
    } else if (filters?.sortBy === 'name-desc') {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    // Note: Default 'name' (A-Z) sorting is already applied at SQL level before grouping
    
    console.log(`✅ searchProducts: Restituiti ${filteredProducts.length} prodotti raggruppati`);
    
    // Return only the main products (group representatives)
    return filteredProducts;
  }

  async getProductsByCategory(categorySlug: string): Promise<DBProduct[]> {
    // Prima ottengo tutti i prodotti usando query sicure e product_options per prezzi
    const result = await db.execute(sql`
      SELECT p.*, b.name as brand_name, pc.name as category_name,
             po_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price_cents) as price
        FROM product_options 
        WHERE price_cents > 0
        GROUP BY product_id
      ) po_min ON p.id = po_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE pc.slug = ${categorySlug}
      AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
      ORDER BY p.name ASC, p.id ASC
    `);
    
    // Raggruppo i prodotti per nome e brand per gestire le varianti
    const groupedProducts = new Map();
    const products = result.rows as any[];
    
    console.log(`🔧 Inizio raggruppamento di ${products.length} prodotti per ${categorySlug}`);
    
    for (const product of products) {
      // Uso group_id se disponibile, altrimenti fallback a nome-brand  
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      
      console.log(`🔍 Prodotto: ${product.slug}, group_id: ${product.group_id}, key: ${key}`);
      
      if (!groupedProducts.has(key)) {
        // Primo prodotto del gruppo - diventa il prodotto principale
        groupedProducts.set(key, {
          ...product,
          variants: [product],
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents, // Aggiungo il prezzo per il frontend
          primaryImage: product.primaryimage ? (
            product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/') 
              ? product.primaryimage 
              : `/images/products/${product.primaryimage}`
          ) : undefined,
          product_group_name: product.product_group_name // Preserva il nome del gruppo
        });
      } else {
        // Aggiungo come variante
        console.log(`🔗 Variante trovata per ${key}: ${product.slug}`);
        const group = groupedProducts.get(key);
        group.variants.push(product);
        
        // Se il gruppo principale non ha primaryImage ma questa variante sì, usala
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/')
            ? product.primaryimage 
            : `/images/products/${product.primaryimage}`;
        }
        
        // Aggiorno il range di prezzo
        if (product.min_price_cents) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents; // Aggiorno anche il prezzo base per il frontend
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
      }
    }
    
    const grouped = Array.from(groupedProducts.values()) as any[];
    console.log(`📦 Raggruppamento completato: ${products.length} → ${grouped.length} prodotti`);
    
    // Restituisco solo i prodotti principali (rappresentanti dei gruppi)
    return grouped;
  }

  async getProductGroupsByCategory(categorySlug: string): Promise<any[]> {
    const result = await db.execute(sql`
      SELECT gp.*, b.name as brand_name, pc.name as category_name
      FROM grouped_products gp
      JOIN brands b ON gp.brand_id = b.id
      JOIN product_categories pc ON gp.category_id = pc.id
      WHERE pc.slug = ${categorySlug}
      ORDER BY gp.variant_count DESC, gp.name ASC
    `);
    
    return result.rows;
  }

  async getProductGroupBySlug(slug: string): Promise<any> {
    const result = await db.execute(sql`
      SELECT gp.*, b.name as brand_name, pc.name as category_name
      FROM grouped_products gp
      JOIN brands b ON gp.brand_id = b.id
      JOIN product_categories pc ON gp.category_id = pc.id
      WHERE gp.slug = ${slug}
    `);
    
    return result.rows[0] || undefined;
  }

  async createProductGroup(group: InsertProductGroup): Promise<ProductGroup> {
    const [productGroup] = await db
      .insert(productGroups)
      .values(group)
      .returning();
    return productGroup;
  }

  async getBaseProductsByCategory(categorySlug: string): Promise<any[]> {
    const result = await db.execute(`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.long_description,
        b.name as brand_name,
        pc.name as category_name,
        MIN(pv.price_cents) as price_range_min,
        MAX(pv.price_cents) as price_range_max,
        array_agg(DISTINCT pv.flavor) as available_flavors,
        array_agg(DISTINCT pv.size) as available_quantities,
        pi.src as base_image
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_variants pv ON p.id = pv.base_product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE pc.slug = $1
      GROUP BY p.id, p.name, p.slug, p.description, p.long_description, b.name, pc.name, pi.src
      ORDER BY p.name ASC
    `);
    
    return result.rows;
  }

  async getProductVariants(baseProductSlug: string): Promise<any[]> {
    // Prima trova il prodotto base per ottenere group_id o nome base usando query sicure
    const baseProductResult = await db.execute(sql`
      SELECT p.*, b.name as brand_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = ${baseProductSlug}
    `);
    
    if (baseProductResult.rows.length === 0) return [];
    
    const baseProduct = baseProductResult.rows[0] as {id: number, name: string, brand_name: string, brand_id: number, group_id?: number};
    
    // Trova tutte le varianti usando group_id se disponibile, altrimenti nome base con query sicure
    let result;
    if (baseProduct.group_id) {
      result = await db.execute(sql`
        SELECT DISTINCT
          p.id,
          p.slug as variant_slug,
          p.flavor,
          p.quantity as size,
          po.price_cents as price_cents,
          p.id as original_product_id,
          COALESCE('/images/products/' || p.slug || '.jpg', '/images/products/default.jpg') as image_path
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        LEFT JOIN product_options po ON p.id = po.product_id
        WHERE p.group_id = ${baseProduct.group_id}
        AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
        ORDER BY p.flavor, p.quantity
      `);
    } else {
      // Fallback: trova prodotti con nome simile dello stesso brand
      const baseName = baseProduct.name
        .replace(/ (750g|1kg|2kg|500g|300g|400g|350g|250g|150g|80g|60g|100g|200g)/g, '')
        .replace(/ (Chocolate|Vanilla|Strawberry|Natural|Banana|Orange|Lemon|Coffee|Coconut|Cioccolato|Vaniglia|Fragola|Naturale|Caffè|Cocco|Limone|Arancia|Mirtillo|Unico)/g, '')
        .trim();
      
      result = await db.execute(sql`
        SELECT DISTINCT
          p.id,
          p.slug as variant_slug,
          p.flavor,
          p.quantity as size,
          po.price_cents as price_cents,
          p.id as original_product_id,
          COALESCE('/images/products/' || p.slug || '.jpg', '/images/products/default.jpg') as image_path
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        LEFT JOIN product_options po ON p.id = po.product_id
        WHERE p.brand_id = ${baseProduct.brand_id}
        AND (p.name LIKE ${`%${baseName}%`} OR p.name = ${baseProduct.name})
        AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
        ORDER BY p.flavor, p.quantity
      `);
    }
    
    console.log(`🔧 Variants found for ${baseProductSlug}:`, result.rows.length);
    return result.rows;
  }

  async getProductBySlug(slug: string): Promise<DBProduct | undefined> {
    const result = await db.execute(`
      SELECT p.*, b.name as brand_name, pc.name as category_name, pc.slug as category_slug,
             MIN(ps.price) as min_price_cents,
             pi.src as primaryimage
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.slug = '${slug}'
      GROUP BY p.id, b.name, pc.name, pc.slug, pi.src
    `);
    
    const product = result.rows[0] as any;
    if (!product) return undefined;

    // Note: product_availability table doesn't exist yet, skipping availability query
    // TODO: Re-enable when product_availability table is created
    // const availabilityResult = await db.execute(`
    //   SELECT pa.is_available, pa.stock_quantity, s.name as store_name, s.id as store_id
    //   FROM product_availability pa
    //   JOIN stores s ON pa.store_id = s.id
    //   WHERE pa.product_id = ${product.id}
    // `);
    // const availability = availabilityResult.rows.map((row: any) => ({
    //   storeId: row.store_id,
    //   storeName: row.store_name,
    //   isAvailable: row.is_available,
    //   stockQuantity: row.stock_quantity
    // }));

    console.log(`🔍 DEBUG: product.primaryimage = "${product.primaryimage}"`);

    const imageUrl = product.primaryimage ? (
      product.primaryimage.startsWith('/images/') || product.primaryimage.startsWith('/attached_assets/')
        ? product.primaryimage
        : `/images/products/${product.primaryimage}`
    ) : undefined;

    const finalProduct = {
      ...product,
      primaryImage: imageUrl,
      image_url: imageUrl, // Frontend cerca questo campo
      availability: [] // Empty array since product_availability table doesn't exist yet
    };

    console.log(`🔍 DEBUG: finalProduct.primaryImage = "${finalProduct.primaryImage}"`);
    return finalProduct;
  }

  async getProductBySlugWithDetails(slug: string): Promise<any> {
    // Prima carico il prodotto specifico CON i dati del productGroup usando product_options
    const result = await db.execute(sql`
      SELECT p.*, b.name as brand_name, pc.name as category_name, pc.slug as category_slug,
             po.id as option_id, po.size as size_value, po.price_cents as price_cents,
             pi.src as image_url, pi.alt as image_alt,
             pg.name as product_group_name, pg.features as product_group_features,
             p.features as features,
             p.has_creapure
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN product_options po ON p.id = po.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.slug = ${slug}
      ORDER BY po.price_cents ASC
    `);
    
    if (result.rows.length === 0) return undefined;
    
    const baseProduct = result.rows[0];
    
    
    // Cerco varianti usando group_id se disponibile, altrimenti fallback a nome-brand
    let variantsResult;
    if (baseProduct.group_id) {
      // Se il prodotto ha group_id, trova tutti i prodotti con lo stesso group_id
      variantsResult = await db.execute(`
        SELECT DISTINCT p.slug, p.flavor, 
               CASE 
                 WHEN ps.value IS NOT NULL AND ps.unit IS NOT NULL 
                 THEN CONCAT(ps.value, ps.unit)
                 ELSE p.size 
               END as size, 
               p.quantity, ps.price as price_cents, pi.src as image_url
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
        WHERE p.group_id = '${baseProduct.group_id}'
        ORDER BY p.flavor ASC, ps.price ASC
      `);
      console.log(`🔗 Cercando varianti per group_id ${baseProduct.group_id}`);
    } else {
      // Fallback al metodo precedente per prodotti senza group_id
      variantsResult = await db.execute(`
        SELECT DISTINCT p.slug, p.flavor, 
               CASE 
                 WHEN ps.value IS NOT NULL AND ps.unit IS NOT NULL 
                 THEN CONCAT(ps.value, ps.unit)
                 ELSE p.size 
               END as size, 
               p.quantity, ps.price as price_cents, pi.src as image_url
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
        WHERE p.name = '${(baseProduct as any).name.replace(/'/g, "''")}' AND b.name = '${(baseProduct as any).brand_name.replace(/'/g, "''")}'
        ORDER BY p.flavor ASC, ps.price ASC
      `);
      console.log(`🔍 Cercando varianti per nome-brand: ${baseProduct.name}`);
    }
    
    console.log(`🔍 Trovate ${variantsResult.rows.length} varianti per ${(baseProduct as any).name}:`, variantsResult.rows.map((r: any) => `${r.flavor} ${r.size} (€${r.price_cents/100})`));
    
    // Costruisco le varianti dal gruppo di prodotti
    const variants = variantsResult.rows.map(row => {
      // Logica speciale per immagini specifiche di varianti
      let imageUrl = row.image_url;
      
      // Per EAA Tabs, usa immagine specifica per 500 compresse
      if (baseProduct.name === 'EAA Tabs' && row.size === '500compresse') {
        imageUrl = '/images/eaa-tabs-500-compresse.jpg';
      } else if (baseProduct.name === 'EAA Tabs') {
        imageUrl = '/images/products/eaa-tabs.jpg';
      }
      
      // Per Glutammina Sport Recovery, usa immagine specifica per 500g
      if (baseProduct.name === 'Glutammina Sport Recovery' && row.size === '500g') {
        imageUrl = '/images/glutammina-sport-recovery-500g.jpg';
      }
      
      return {
        id: row.slug,
        flavor: row.flavor,    // Usa il gusto reale dal database
        size: row.size,        // Usa il size costruito dalla query SQL (es: "250g", "500g", "1kg")
        price: ((row as any).price_cents / 100), // Converti in euro per il frontend
        price_cents: (row as any).price_cents,
        variant_slug: row.slug,
        image: imageUrl || `/images/products/${row.slug}.jpg`, // Fallback all'immagine basata sullo slug
        image_url: imageUrl || `/images/products/${row.slug}.jpg`,
        inStock: true // Assumiamo che siano disponibili
      };
    });
    
    return {
      ...baseProduct,
      product_group_name: baseProduct.product_group_name,
      product_group_features: baseProduct.product_group_features,
      variants
    };
  }

  async createProduct(product: InsertProduct): Promise<DBProduct> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  // Category management
  async getCategories(): Promise<ProductCategory[]> {
    return await db.select().from(productCategories);
  }

  async getCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
    const [category] = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: InsertProductCategory): Promise<ProductCategory> {
    const [newCategory] = await db
      .insert(productCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Brand management
  async getBrands(): Promise<Brand[]> {
    return await db.select().from(brands);
  }

  async getBrandsFilteredByContext(filters?: {
    categorySlug?: string;
    searchQuery?: string;
  }): Promise<Brand[]> {
    // Build WHERE conditions safely using sql template literals
    let whereConditions = [sql`p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'`];

    // Add category filter if specified
    if (filters?.categorySlug) {
      whereConditions.push(sql`pc.slug = ${filters.categorySlug}`);
    }

    // Add search filter if specified
    if (filters?.searchQuery && filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.trim();
      whereConditions.push(sql`(
        LOWER(p.name) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(p.description) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(b.name) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(pc.name) LIKE LOWER(${`%${searchTerm}%`})
      )`);
    }

    // Combine all WHERE conditions
    const whereClause = whereConditions.length > 1 
      ? sql`WHERE ${sql.join(whereConditions, sql` AND `)}`
      : sql`WHERE ${whereConditions[0]}`;

    const result = await db.execute(sql`
      SELECT DISTINCT b.id, b.name, b.slug, b.description, b.website, b.logo
      FROM brands b
      JOIN products p ON b.id = p.brand_id
      JOIN product_categories pc ON p.category_id = pc.id
      ${whereClause}
      ORDER BY b.name ASC
    `);

    return result.rows as Brand[];
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db
      .select()
      .from(brands)
      .where(eq(brands.slug, slug));
    return brand || undefined;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const [newBrand] = await db
      .insert(brands)
      .values(brand)
      .returning();
    return newBrand;
  }

  // Product images management
  async createProductImage(image: InsertProductImage): Promise<ProductImage> {
    const [newImage] = await db
      .insert(productImages)
      .values(image)
      .returning();
    return newImage;
  }

  // Product sizes management
  async createProductSize(size: InsertProductSize): Promise<ProductSize> {
    const [newSize] = await db
      .insert(productSizes)
      .values(size)
      .returning();
    return newSize;
  }

  // Product availability management
  async createProductAvailability(availability: InsertProductAvailability): Promise<ProductAvailability> {
    const [newAvailability] = await db
      .insert(productAvailability)
      .values(availability)
      .returning();
    return newAvailability;
  }

  // User favorites management
  async addToFavorites(userId: number, productId: number): Promise<UserFavorite> {
    const [favorite] = await db
      .insert(userFavorites)
      .values({ userId, productId })
      .returning();
    return favorite;
  }

  async removeFromFavorites(userId: number, productId: number): Promise<void> {
    await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.productId, productId)
        )
      );
  }

  async getUserFavorites(userId: number): Promise<DBProduct[]> {
    const results = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        longDescription: products.longDescription,
        flavor: products.flavor,
        size: products.size,
        quantity: products.quantity,
        brandName: brands.name,
        categoryName: productCategories.name,
        categorySlug: productCategories.slug,
        isNew: products.isNew,
        hasSpecialOffer: products.hasSpecialOffer,
        minPriceCents: sql<number>`COALESCE(MIN(${productSizes.price}), 0)`.as("min_price_cents")
      })
      .from(products)
      .innerJoin(userFavorites, eq(products.id, userFavorites.productId))
      .leftJoin(brands, eq(products.brandId, brands.id))
      .leftJoin(productCategories, eq(products.categoryId, productCategories.id))
      .leftJoin(productSizes, eq(products.id, productSizes.productId))
      .where(eq(userFavorites.userId, userId))
      .groupBy(products.id, brands.name, productCategories.name, productCategories.slug);
    
    return results.map(row => ({
      ...row,
      basePrice: row.minPriceCents ? row.minPriceCents / 100 : null
    })) as any;
  }

  async isProductFavorite(userId: number, productId: number): Promise<boolean> {
    const [result] = await db
      .select()
      .from(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.productId, productId)
        )
      );
    return !!result;
  }

  async clearUserFavorites(userId: number): Promise<void> {
    await db
      .delete(userFavorites)
      .where(eq(userFavorites.userId, userId));
  }

  // Product options management
  async getProductOptionsById(productId: number): Promise<ProductOption[]> {
    return await db
      .select()
      .from(productOptions)
      .where(eq(productOptions.productId, productId));
  }

  async getProductOptionsBySlug(slug: string): Promise<any[]> {
    // Get the product by slug first, then its options in ProductVariant format using safe queries
    const result = await db
      .select({
        flavor: productOptions.flavor,
        size: productOptions.size,
        price_cents: productOptions.priceCents,
        original_price_cents: productOptions.originalPriceCents,
        image: productOptions.image,
        in_stock: productOptions.inStock,
        slug: products.slug
      })
      .from(productOptions)
      .innerJoin(products, eq(productOptions.productId, products.id))
      .where(eq(products.slug, slug));

    // Convert to ProductVariant format (price in euros, compatible with frontend)
    return result.map(row => ({
      flavor: row.flavor || '',
      size: row.size || '',
      price: row.price_cents ? row.price_cents / 100 : 0, // Convert cents to euros
      originalPrice: row.original_price_cents ? row.original_price_cents / 100 : undefined,
      image: row.image || '',
      inStock: row.in_stock !== false
    }));
  }

  async createProductOption(option: InsertProductOption): Promise<ProductOption> {
    const [newOption] = await db
      .insert(productOptions)
      .values(option)
      .returning();
    return newOption;
  }

  async listProductsWithMinPrice(): Promise<any[]> {
    // Get all product_groups with aggregated data using subqueries to avoid GROUP BY on JSON fields
    const result = await db.execute(sql`
      SELECT pg.id, pg.slug, pg.name, pg.description, pg.long_description,
             pg.is_new, pg.is_best_seller, pg.has_special_offer,
             COALESCE(b.name, brands_fallback.name) as brand_name, 
             COALESCE(b.slug, brands_fallback.slug) as brand_slug,
             COALESCE(pc.name, categories_fallback.name) as category_name, 
             COALESCE(pc.slug, categories_fallback.slug) as category_slug,
             price.min_price_cents,
             variants.variant_count,
             img.primaryimage
      FROM product_groups pg
      LEFT JOIN brands b ON b.id = pg.brand_id
      LEFT JOIN product_categories pc ON pc.id = pg.category_id
      LEFT JOIN LATERAL (
        SELECT b2.id, b2.name, b2.slug
        FROM products p2 JOIN brands b2 ON p2.brand_id = b2.id
        WHERE p2.group_id = pg.id
        ORDER BY p2.id LIMIT 1
      ) brands_fallback ON true
      LEFT JOIN LATERAL (
        SELECT pc2.id, pc2.name, pc2.slug
        FROM products p3 JOIN product_categories pc2 ON p3.category_id = pc2.id
        WHERE p3.group_id = pg.id
        ORDER BY p3.id LIMIT 1
      ) categories_fallback ON true
      LEFT JOIN LATERAL (
        SELECT MIN(po.price_cents) AS min_price_cents
        FROM products p 
        JOIN product_options po ON po.product_id = p.id AND po.price_cents > 0
        WHERE p.group_id = pg.id
      ) price ON true
      LEFT JOIN LATERAL (
        SELECT COUNT(DISTINCT p.id) AS variant_count
        FROM products p 
        WHERE p.group_id = pg.id
      ) variants ON true
      LEFT JOIN LATERAL (
        SELECT pi.src AS primaryimage
        FROM products p2 
        JOIN product_images pi ON pi.product_id = p2.id
        WHERE p2.group_id = pg.id
        ORDER BY pi.is_primary DESC NULLS LAST
        LIMIT 1
      ) img ON true
      ORDER BY price.min_price_cents ASC NULLS LAST, pg.name ASC
    `);

    console.log(`📦 listProductsWithMinPrice: Restituiti ${result.rows.length} productGroups invece di singoli prodotti`);

    return (result.rows as any[]).map(row => ({
      ...row,
      price: row.min_price_cents ? row.min_price_cents / 100 : 0,
      price_range_min: row.min_price_cents,
      primaryImage: row.primaryimage ? (
        row.primaryimage.startsWith('/images/') || row.primaryimage.startsWith('/attached_assets/')
          ? row.primaryimage
          : `/images/products/${row.primaryimage}`
      ) : undefined
    }));
  }

  // Product slug redirects management
  async createSlugRedirect(redirect: InsertProductSlugRedirect): Promise<ProductSlugRedirect> {
    const [newRedirect] = await db
      .insert(productSlugRedirects)
      .values(redirect)
      .returning();
    return newRedirect;
  }

  async findRedirectByOldSlug(oldSlug: string): Promise<ProductSlugRedirect | undefined> {
    const [redirect] = await db
      .select()
      .from(productSlugRedirects)
      .where(eq(productSlugRedirects.oldSlug, oldSlug))
      .limit(1);
    return redirect || undefined;
  }

  async updateProductSlug(productId: number, newSlug: string): Promise<{ oldSlug: string; newSlug: string }> {
    // Prima ottengo lo slug attuale del prodotto
    const [currentProduct] = await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);
    
    if (!currentProduct) {
      throw new Error("Product not found");
    }

    const oldSlug = currentProduct.slug;

    // Aggiorno lo slug del prodotto
    await db
      .update(products)
      .set({ slug: newSlug })
      .where(eq(products.id, productId));

    // Creo il redirect dal vecchio slug al nuovo slug solo se sono diversi
    if (oldSlug !== newSlug) {
      await this.createSlugRedirect({
        oldSlug,
        newSlug,
        productId
      });
    }

    return { oldSlug, newSlug };
  }
}

export const storage = new DatabaseStorage();
