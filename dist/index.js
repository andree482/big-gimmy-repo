var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/priceWatcher.ts
var priceWatcher_exports = {};
__export(priceWatcher_exports, {
  PriceWatcher: () => PriceWatcher
});
var PriceWatcher;
var init_priceWatcher = __esm({
  "server/priceWatcher.ts"() {
    "use strict";
    PriceWatcher = class {
      spreadsheetId;
      sheetName;
      active = false;
      constructor(spreadsheetId, sheetName = "Prezzi Prodotti") {
        this.spreadsheetId = spreadsheetId;
        this.sheetName = sheetName;
      }
      start(intervalMinutes = 2) {
        this.active = true;
        console.log(`\u{1F4C8} PriceWatcher started for ${this.spreadsheetId} every ${intervalMinutes} min`);
      }
      stop() {
        this.active = false;
        console.log(`\u{1F6D1} PriceWatcher stopped`);
      }
      isActive() {
        return this.active;
      }
      async authenticate() {
        console.log("\u{1F510} PriceWatcher authenticate stub");
        return null;
      }
      async syncDatabaseToGoogleSheets() {
        console.log(`\u{1F501} Sync database to Google Sheets for ${this.spreadsheetId}/${this.sheetName}`);
      }
    };
  }
});

// server/index.ts
import "dotenv/config";
import express2 from "express";
import path3 from "path";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  brands: () => brands,
  contacts: () => contacts,
  insertBrandSchema: () => insertBrandSchema,
  insertContactSchema: () => insertContactSchema,
  insertProductAvailabilitySchema: () => insertProductAvailabilitySchema,
  insertProductCategorySchema: () => insertProductCategorySchema,
  insertProductGroupSchema: () => insertProductGroupSchema,
  insertProductImageSchema: () => insertProductImageSchema,
  insertProductOptionSchema: () => insertProductOptionSchema,
  insertProductSchema: () => insertProductSchema,
  insertProductSizeSchema: () => insertProductSizeSchema,
  insertProductSlugRedirectSchema: () => insertProductSlugRedirectSchema,
  insertStoreSchema: () => insertStoreSchema,
  insertUserFavoriteSchema: () => insertUserFavoriteSchema,
  insertUserSchema: () => insertUserSchema,
  productAvailability: () => productAvailability,
  productAvailabilityRelations: () => productAvailabilityRelations,
  productCategories: () => productCategories,
  productGroups: () => productGroups,
  productGroupsRelations: () => productGroupsRelations,
  productImages: () => productImages,
  productImagesRelations: () => productImagesRelations,
  productOptions: () => productOptions,
  productOptionsRelations: () => productOptionsRelations,
  productSizes: () => productSizes,
  productSizesRelations: () => productSizesRelations,
  productSlugRedirects: () => productSlugRedirects,
  products: () => products,
  productsRelations: () => productsRelations,
  stores: () => stores,
  userFavorites: () => userFavorites,
  userFavoritesRelations: () => userFavoritesRelations,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  message: true
});
var stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 100 }),
  hours: text("hours").notNull(),
  mapLink: text("map_link"),
  isNew: boolean("is_new").default(false)
});
var insertStoreSchema = createInsertSchema(stores).pick({
  name: true,
  address: true,
  phone: true,
  email: true,
  hours: true,
  mapLink: true,
  isNew: true
});
var brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  website: text("website"),
  logo: text("logo")
});
var insertBrandSchema = createInsertSchema(brands).pick({
  name: true,
  slug: true,
  description: true,
  website: true,
  logo: true
});
var productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  image: text("image")
});
var insertProductCategorySchema = createInsertSchema(productCategories).pick({
  name: true,
  slug: true,
  description: true,
  image: true
});
var productGroups = pgTable("product_groups", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  features: json("features").$type(),
  howToUse: text("how_to_use"),
  warnings: text("warnings"),
  specialOfferText: text("special_offer_text"),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  hasSpecialOffer: boolean("has_special_offer").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  groupId: integer("group_id").references(() => productGroups.id),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  features: json("features").$type(),
  howToUse: text("how_to_use"),
  warnings: text("warnings"),
  specialOfferText: text("special_offer_text"),
  flavor: varchar("flavor", { length: 100 }),
  size: varchar("size", { length: 50 }),
  quantity: varchar("quantity", { length: 50 }),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  hasSpecialOffer: boolean("has_special_offer").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertProductGroupSchema = createInsertSchema(productGroups).pick({
  slug: true,
  name: true,
  brandId: true,
  categoryId: true,
  description: true,
  longDescription: true,
  features: true,
  howToUse: true,
  warnings: true,
  specialOfferText: true,
  isNew: true,
  isBestSeller: true,
  hasSpecialOffer: true
});
var insertProductSchema = createInsertSchema(products).pick({
  slug: true,
  name: true,
  groupId: true,
  brandId: true,
  categoryId: true,
  description: true,
  longDescription: true,
  features: true,
  howToUse: true,
  warnings: true,
  specialOfferText: true,
  flavor: true,
  size: true,
  quantity: true,
  isNew: true,
  isBestSeller: true,
  hasSpecialOffer: true
});
var productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  isPrimary: boolean("is_primary").default(false)
});
var insertProductImageSchema = createInsertSchema(productImages).pick({
  productId: true,
  src: true,
  alt: true,
  isPrimary: true
});
var productSizes = pgTable("product_sizes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  value: varchar("value", { length: 50 }).notNull(),
  unit: varchar("unit", { length: 20 }).notNull(),
  price: integer("price").notNull()
  // Prezzo in centesimi
});
var insertProductSizeSchema = createInsertSchema(productSizes).pick({
  productId: true,
  value: true,
  unit: true,
  price: true
});
var productAvailability = pgTable("product_availability", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  storeId: integer("store_id").notNull().references(() => stores.id),
  isAvailable: boolean("is_available").default(true),
  stockQuantity: integer("stock_quantity"),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertProductAvailabilitySchema = createInsertSchema(productAvailability).pick({
  productId: true,
  storeId: true,
  isAvailable: true,
  stockQuantity: true
});
var userFavorites = pgTable("user_favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserFavoriteSchema = createInsertSchema(userFavorites).pick({
  userId: true,
  productId: true
});
var productGroupsRelations = relations(productGroups, ({ one, many }) => ({
  brand: one(brands, {
    fields: [productGroups.brandId],
    references: [brands.id]
  }),
  category: one(productCategories, {
    fields: [productGroups.categoryId],
    references: [productCategories.id]
  }),
  variants: many(products)
}));
var productsRelations = relations(products, ({ one, many }) => ({
  group: one(productGroups, {
    fields: [products.groupId],
    references: [productGroups.id]
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id]
  }),
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id]
  }),
  images: many(productImages),
  sizes: many(productSizes),
  availability: many(productAvailability),
  options: many(productOptions)
}));
var productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id]
  })
}));
var productSizesRelations = relations(productSizes, ({ one }) => ({
  product: one(products, {
    fields: [productSizes.productId],
    references: [products.id]
  })
}));
var productAvailabilityRelations = relations(productAvailability, ({ one }) => ({
  product: one(products, {
    fields: [productAvailability.productId],
    references: [products.id]
  }),
  store: one(stores, {
    fields: [productAvailability.storeId],
    references: [stores.id]
  })
}));
var userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id]
  }),
  product: one(products, {
    fields: [userFavorites.productId],
    references: [products.id]
  })
}));
var productOptions = pgTable("product_options", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  flavor: text("flavor"),
  size: text("size"),
  priceCents: integer("price_cents").notNull(),
  // Prezzo in centesimi
  originalPriceCents: integer("original_price_cents"),
  image: text("image"),
  inStock: boolean("in_stock").default(true)
});
var insertProductOptionSchema = createInsertSchema(productOptions).omit({
  id: true
});
var productOptionsRelations = relations(productOptions, ({ one }) => ({
  product: one(products, {
    fields: [productOptions.productId],
    references: [products.id]
  })
}));
var productSlugRedirects = pgTable("product_slug_redirects", {
  id: serial("id").primaryKey(),
  oldSlug: varchar("old_slug", { length: 200 }).notNull(),
  newSlug: varchar("new_slug", { length: 200 }).notNull(),
  productId: integer("product_id").notNull().references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertProductSlugRedirectSchema = createInsertSchema(productSlugRedirects).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
var { Pool } = pkg;
dotenv.config();
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}
var pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 8080,
  max: 20,
  idleTimeoutMillis: 3e4
});
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
var db = drizzle(pool, { schema: schema_exports });
console.log("\u2705 Database configuration loaded");
console.log(`\u{1F4CA} Connected to: ${connectionString.split("@")[1]}`);

// server/storage.ts
import { eq, and, sql } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContact(insertContact) {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
  async getContacts() {
    return await db.select().from(contacts);
  }
  // Product management
  async getAllProducts() {
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
    const groupedProducts = /* @__PURE__ */ new Map();
    const products2 = result.rows;
    console.log(`\u{1F527} Inizio raggruppamento di ${products2.length} prodotti totali`);
    for (const product of products2) {
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      if (!groupedProducts.has(key)) {
        groupedProducts.set(key, {
          ...product,
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents,
          primaryImage: product.primaryimage ? product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}` : void 0
        });
      } else {
        const group = groupedProducts.get(key);
        if (product.min_price_cents && product.min_price_cents > 0) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents;
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}`;
        }
      }
    }
    const finalProducts = Array.from(groupedProducts.values());
    console.log(`\u{1F4E6} Raggruppamento completato: ${products2.length} \u2192 ${finalProducts.length} prodotti`);
    return finalProducts;
  }
  async searchProducts(searchQuery, filters) {
    console.log(`\u{1F50D} searchProducts: Querying products with grouping (ricerca: "${searchQuery}", filtri: ${JSON.stringify(filters)})`);
    let orderBy = "p.name ASC, p.id ASC";
    if (filters?.sortBy === "price-asc") {
      orderBy = "min_price_cents ASC NULLS LAST";
    } else if (filters?.sortBy === "price-desc") {
      orderBy = "min_price_cents DESC NULLS LAST";
    } else if (filters?.sortBy === "name-desc") {
      orderBy = "p.name DESC";
    }
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
    const whereParts = [];
    if (filters?.categorySlug) {
      whereParts.push(sql`pc.slug = ${filters.categorySlug}`);
    }
    if (filters?.brandSlug) {
      whereParts.push(sql`b.slug = ${filters.brandSlug}`);
    }
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = `%${searchQuery.trim()}%`;
      whereParts.push(sql`(p.name ILIKE ${searchTerm} OR b.name ILIKE ${searchTerm})`);
    }
    const finalQuery = whereParts.length > 0 ? sql`${baseQuery} AND ${sql.join(whereParts, sql` AND `)} ORDER BY ${sql.raw(orderBy)}` : sql`${baseQuery} ORDER BY ${sql.raw(orderBy)}`;
    const result = await db.execute(finalQuery);
    const products2 = result.rows;
    console.log(`\u{1F527} Inizio raggruppamento di ${products2.length} prodotti trovati`);
    const groupedProducts = /* @__PURE__ */ new Map();
    for (const product of products2) {
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      console.log(`\u{1F50D} Prodotto: ${product.slug}, group_id: ${product.group_id}, key: ${key}`);
      if (!groupedProducts.has(key)) {
        groupedProducts.set(key, {
          ...product,
          variants: [product],
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents,
          // Add price for frontend
          primaryImage: product.primaryimage ? product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}` : void 0,
          product_group_name: product.product_group_name
          // Preserve group name
        });
      } else {
        console.log(`\u{1F517} Variante trovata per ${key}: ${product.slug}`);
        const group = groupedProducts.get(key);
        group.variants.push(product);
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}`;
        }
        if (product.min_price_cents) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents;
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
      }
    }
    const groupedArray = Array.from(groupedProducts.values());
    console.log(`\u{1F4E6} Raggruppamento completato: ${products2.length} \u2192 ${groupedArray.length} prodotti`);
    let filteredProducts = groupedArray;
    if (filters?.priceRange && filters.priceRange !== "all") {
      filteredProducts = groupedArray.filter((group) => {
        const priceInEuros = (group.price_range_min || 0) / 100;
        switch (filters.priceRange) {
          case "0-25":
            return priceInEuros <= 25;
          case "25-50":
            return priceInEuros >= 25 && priceInEuros <= 50;
          case "50-100":
            return priceInEuros >= 50 && priceInEuros <= 100;
          case "100+":
            return priceInEuros >= 100;
          default:
            return true;
        }
      });
    }
    if (filters?.sortBy === "price-asc") {
      filteredProducts.sort((a, b) => {
        const priceA = a.price_range_min || 0;
        const priceB = b.price_range_min || 0;
        return priceA - priceB;
      });
    } else if (filters?.sortBy === "price-desc") {
      filteredProducts.sort((a, b) => {
        const priceA = a.price_range_min || 0;
        const priceB = b.price_range_min || 0;
        return priceB - priceA;
      });
    } else if (filters?.sortBy === "name-desc") {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    console.log(`\u2705 searchProducts: Restituiti ${filteredProducts.length} prodotti raggruppati`);
    return filteredProducts;
  }
  async getProductsByCategory(categorySlug) {
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
    const groupedProducts = /* @__PURE__ */ new Map();
    const products2 = result.rows;
    console.log(`\u{1F527} Inizio raggruppamento di ${products2.length} prodotti per ${categorySlug}`);
    for (const product of products2) {
      const key = product.group_id ? `group-${product.group_id}` : `${product.name}-${product.brand_name}`;
      console.log(`\u{1F50D} Prodotto: ${product.slug}, group_id: ${product.group_id}, key: ${key}`);
      if (!groupedProducts.has(key)) {
        groupedProducts.set(key, {
          ...product,
          variants: [product],
          price_range_min: product.min_price_cents,
          price_range_max: product.min_price_cents,
          price: product.min_price_cents,
          // Aggiungo il prezzo per il frontend
          primaryImage: product.primaryimage ? product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}` : void 0,
          product_group_name: product.product_group_name
          // Preserva il nome del gruppo
        });
      } else {
        console.log(`\u{1F517} Variante trovata per ${key}: ${product.slug}`);
        const group = groupedProducts.get(key);
        group.variants.push(product);
        if (!group.primaryImage && product.primaryimage) {
          group.primaryImage = product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}`;
        }
        if (product.min_price_cents) {
          if (!group.price_range_min || product.min_price_cents < group.price_range_min) {
            group.price_range_min = product.min_price_cents;
            group.price = product.min_price_cents;
          }
          if (!group.price_range_max || product.min_price_cents > group.price_range_max) {
            group.price_range_max = product.min_price_cents;
          }
        }
      }
    }
    const grouped = Array.from(groupedProducts.values());
    console.log(`\u{1F4E6} Raggruppamento completato: ${products2.length} \u2192 ${grouped.length} prodotti`);
    return grouped;
  }
  async getProductGroupsByCategory(categorySlug) {
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
  async getProductGroupBySlug(slug) {
    const result = await db.execute(sql`
      SELECT gp.*, b.name as brand_name, pc.name as category_name
      FROM grouped_products gp
      JOIN brands b ON gp.brand_id = b.id
      JOIN product_categories pc ON gp.category_id = pc.id
      WHERE gp.slug = ${slug}
    `);
    return result.rows[0] || void 0;
  }
  async createProductGroup(group) {
    const [productGroup] = await db.insert(productGroups).values(group).returning();
    return productGroup;
  }
  async getBaseProductsByCategory(categorySlug) {
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
  async getProductVariants(baseProductSlug) {
    const baseProductResult = await db.execute(sql`
      SELECT p.*, b.name as brand_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = ${baseProductSlug}
    `);
    if (baseProductResult.rows.length === 0) return [];
    const baseProduct = baseProductResult.rows[0];
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
      const baseName = baseProduct.name.replace(/ (750g|1kg|2kg|500g|300g|400g|350g|250g|150g|80g|60g|100g|200g)/g, "").replace(/ (Chocolate|Vanilla|Strawberry|Natural|Banana|Orange|Lemon|Coffee|Coconut|Cioccolato|Vaniglia|Fragola|Naturale|Caffè|Cocco|Limone|Arancia|Mirtillo|Unico)/g, "").trim();
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
    console.log(`\u{1F527} Variants found for ${baseProductSlug}:`, result.rows.length);
    return result.rows;
  }
  async getProductBySlug(slug) {
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
    const product = result.rows[0];
    if (!product) return void 0;
    const availabilityResult = await db.execute(`
      SELECT pa.is_available, pa.stock_quantity, s.name as store_name, s.id as store_id
      FROM product_availability pa
      JOIN stores s ON pa.store_id = s.id
      WHERE pa.product_id = ${product.id}
    `);
    const availability = availabilityResult.rows.map((row) => ({
      storeId: row.store_id,
      storeName: row.store_name,
      isAvailable: row.is_available,
      stockQuantity: row.stock_quantity
    }));
    console.log(`\u{1F50D} DEBUG: product.primaryimage = "${product.primaryimage}"`);
    const imageUrl = product.primaryimage ? product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}` : void 0;
    const finalProduct = {
      ...product,
      primaryImage: imageUrl,
      image_url: imageUrl,
      // Frontend cerca questo campo
      availability
      // Aggiungo i dati di availability dal database
    };
    console.log(`\u{1F50D} DEBUG: finalProduct.primaryImage = "${finalProduct.primaryImage}"`);
    console.log(`\u{1F50D} DEBUG: finalProduct.availability =`, availability);
    return finalProduct;
  }
  async getProductBySlugWithDetails(slug) {
    const result = await db.execute(sql`
      SELECT p.*, b.name as brand_name, pc.name as category_name, pc.slug as category_slug,
             po.id as option_id, po.size as size_value, po.price_cents as price_cents,
             pi.src as image_url, pi.alt as image_alt,
             pg.name as product_group_name, pg.features as product_group_features,
             p.features as features
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN product_options po ON p.id = po.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.slug = ${slug}
      ORDER BY po.price_cents ASC
    `);
    if (result.rows.length === 0) return void 0;
    const baseProduct = result.rows[0];
    let variantsResult;
    if (baseProduct.group_id) {
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
      console.log(`\u{1F517} Cercando varianti per group_id ${baseProduct.group_id}`);
    } else {
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
        WHERE p.name = '${baseProduct.name.replace(/'/g, "''")}' AND b.name = '${baseProduct.brand_name.replace(/'/g, "''")}'
        ORDER BY p.flavor ASC, ps.price ASC
      `);
      console.log(`\u{1F50D} Cercando varianti per nome-brand: ${baseProduct.name}`);
    }
    console.log(`\u{1F50D} Trovate ${variantsResult.rows.length} varianti per ${baseProduct.name}:`, variantsResult.rows.map((r) => `${r.flavor} ${r.size} (\u20AC${r.price_cents / 100})`));
    const variants = variantsResult.rows.map((row) => {
      let imageUrl = row.image_url;
      if (baseProduct.name === "EAA Tabs" && row.size === "500compresse") {
        imageUrl = "/images/eaa-tabs-500-compresse.jpg";
      } else if (baseProduct.name === "EAA Tabs") {
        imageUrl = "/images/products/eaa-tabs.jpg";
      }
      if (baseProduct.name === "Glutammina Sport Recovery" && row.size === "500g") {
        imageUrl = "/images/glutammina-sport-recovery-500g.jpg";
      }
      return {
        id: row.slug,
        flavor: row.flavor,
        // Usa il gusto reale dal database
        size: row.size,
        // Usa il size costruito dalla query SQL (es: "250g", "500g", "1kg")
        price: row.price_cents / 100,
        // Converti in euro per il frontend
        price_cents: row.price_cents,
        variant_slug: row.slug,
        image: imageUrl || `/images/products/${row.slug}.jpg`,
        // Fallback all'immagine basata sullo slug
        image_url: imageUrl || `/images/products/${row.slug}.jpg`,
        inStock: true
        // Assumiamo che siano disponibili
      };
    });
    return {
      ...baseProduct,
      product_group_name: baseProduct.product_group_name,
      product_group_features: baseProduct.product_group_features,
      variants
    };
  }
  async createProduct(product) {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  // Category management
  async getCategories() {
    return await db.select().from(productCategories);
  }
  async getCategoryBySlug(slug) {
    const [category] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
    return category || void 0;
  }
  async createCategory(category) {
    const [newCategory] = await db.insert(productCategories).values(category).returning();
    return newCategory;
  }
  // Brand management
  async getBrands() {
    return await db.select().from(brands);
  }
  async getBrandsFilteredByContext(filters) {
    let whereConditions = [sql`p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'`];
    if (filters?.categorySlug) {
      whereConditions.push(sql`pc.slug = ${filters.categorySlug}`);
    }
    if (filters?.searchQuery && filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.trim();
      whereConditions.push(sql`(
        LOWER(p.name) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(p.description) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(b.name) LIKE LOWER(${`%${searchTerm}%`}) OR
        LOWER(pc.name) LIKE LOWER(${`%${searchTerm}%`})
      )`);
    }
    const whereClause = whereConditions.length > 1 ? sql`WHERE ${sql.join(whereConditions, sql` AND `)}` : sql`WHERE ${whereConditions[0]}`;
    const result = await db.execute(sql`
      SELECT DISTINCT b.id, b.name, b.slug, b.description, b.website, b.logo
      FROM brands b
      JOIN products p ON b.id = p.brand_id
      JOIN product_categories pc ON p.category_id = pc.id
      ${whereClause}
      ORDER BY b.name ASC
    `);
    return result.rows;
  }
  async getBrandBySlug(slug) {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand || void 0;
  }
  async createBrand(brand) {
    const [newBrand] = await db.insert(brands).values(brand).returning();
    return newBrand;
  }
  // Product images management
  async createProductImage(image) {
    const [newImage] = await db.insert(productImages).values(image).returning();
    return newImage;
  }
  // Product sizes management
  async createProductSize(size) {
    const [newSize] = await db.insert(productSizes).values(size).returning();
    return newSize;
  }
  // Product availability management
  async createProductAvailability(availability) {
    const [newAvailability] = await db.insert(productAvailability).values(availability).returning();
    return newAvailability;
  }
  // User favorites management
  async addToFavorites(userId, productId) {
    const [favorite] = await db.insert(userFavorites).values({ userId, productId }).returning();
    return favorite;
  }
  async removeFromFavorites(userId, productId) {
    await db.delete(userFavorites).where(
      and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.productId, productId)
      )
    );
  }
  async getUserFavorites(userId) {
    const results = await db.select({
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
      minPriceCents: sql`COALESCE(MIN(${productSizes.price}), 0)`.as("min_price_cents")
    }).from(products).innerJoin(userFavorites, eq(products.id, userFavorites.productId)).leftJoin(brands, eq(products.brandId, brands.id)).leftJoin(productCategories, eq(products.categoryId, productCategories.id)).leftJoin(productSizes, eq(products.id, productSizes.productId)).where(eq(userFavorites.userId, userId)).groupBy(products.id, brands.name, productCategories.name, productCategories.slug);
    return results.map((row) => ({
      ...row,
      basePrice: row.minPriceCents ? row.minPriceCents / 100 : null
    }));
  }
  async isProductFavorite(userId, productId) {
    const [result] = await db.select().from(userFavorites).where(
      and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.productId, productId)
      )
    );
    return !!result;
  }
  async clearUserFavorites(userId) {
    await db.delete(userFavorites).where(eq(userFavorites.userId, userId));
  }
  // Product options management
  async getProductOptionsById(productId) {
    return await db.select().from(productOptions).where(eq(productOptions.productId, productId));
  }
  async getProductOptionsBySlug(slug) {
    const result = await db.select({
      flavor: productOptions.flavor,
      size: productOptions.size,
      price_cents: productOptions.priceCents,
      original_price_cents: productOptions.originalPriceCents,
      image: productOptions.image,
      in_stock: productOptions.inStock,
      slug: products.slug
    }).from(productOptions).innerJoin(products, eq(productOptions.productId, products.id)).where(eq(products.slug, slug));
    return result.map((row) => ({
      flavor: row.flavor || "",
      size: row.size || "",
      price: row.price_cents ? row.price_cents / 100 : 0,
      // Convert cents to euros
      originalPrice: row.original_price_cents ? row.original_price_cents / 100 : void 0,
      image: row.image || "",
      inStock: row.in_stock !== false
    }));
  }
  async createProductOption(option) {
    const [newOption] = await db.insert(productOptions).values(option).returning();
    return newOption;
  }
  async listProductsWithMinPrice() {
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
    console.log(`\u{1F4E6} listProductsWithMinPrice: Restituiti ${result.rows.length} productGroups invece di singoli prodotti`);
    return result.rows.map((row) => ({
      ...row,
      price: row.min_price_cents ? row.min_price_cents / 100 : 0,
      price_range_min: row.min_price_cents,
      primaryImage: row.primaryimage ? row.primaryimage.startsWith("/images/") || row.primaryimage.startsWith("/attached_assets/") ? row.primaryimage : `/images/products/${row.primaryimage}` : void 0
    }));
  }
  // Product slug redirects management
  async createSlugRedirect(redirect) {
    const [newRedirect] = await db.insert(productSlugRedirects).values(redirect).returning();
    return newRedirect;
  }
  async findRedirectByOldSlug(oldSlug) {
    const [redirect] = await db.select().from(productSlugRedirects).where(eq(productSlugRedirects.oldSlug, oldSlug)).limit(1);
    return redirect || void 0;
  }
  async updateProductSlug(productId, newSlug) {
    const [currentProduct] = await db.select({ slug: products.slug }).from(products).where(eq(products.id, productId)).limit(1);
    if (!currentProduct) {
      throw new Error("Product not found");
    }
    const oldSlug = currentProduct.slug;
    await db.update(products).set({ slug: newSlug }).where(eq(products.id, productId));
    if (oldSlug !== newSlug) {
      await this.createSlugRedirect({
        oldSlug,
        newSlug,
        productId
      });
    }
    return { oldSlug, newSlug };
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";

// server/utils/imageSync.ts
import { promises as fs } from "fs";
import path from "path";
var ATTACHED_ASSETS_PATH = path.join(process.cwd(), "attached_assets");
var PUBLIC_IMAGES_PATH = path.join(process.cwd(), "public/images/products");
async function syncAllImages() {
  console.log("\u{1F504} Avvio sincronizzazione immagini...");
  try {
    await fs.mkdir(PUBLIC_IMAGES_PATH, { recursive: true });
    const files = await fs.readdir(ATTACHED_ASSETS_PATH);
    const imageFiles = files.filter(
      (file) => /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
    );
    console.log(`\u{1F4F8} Trovate ${imageFiles.length} immagini da sincronizzare`);
    let copied = 0;
    let skipped = 0;
    for (const file of imageFiles) {
      const sourcePath = path.join(ATTACHED_ASSETS_PATH, file);
      const destPath = path.join(PUBLIC_IMAGES_PATH, file);
      try {
        await fs.access(destPath);
        skipped++;
        console.log(`\u23ED\uFE0F  ${file} (gi\xE0 presente)`);
      } catch {
        await fs.copyFile(sourcePath, destPath);
        copied++;
        console.log(`\u2705 ${file}`);
      }
    }
    console.log(`
\u{1F389} Sincronizzazione completata!`);
    console.log(`   \u{1F4F8} ${copied} immagini copiate`);
    console.log(`   \u23ED\uFE0F  ${skipped} immagini gi\xE0 presenti`);
    console.log(`   \u{1F4C1} Tutte le immagini ora disponibili in: ${PUBLIC_IMAGES_PATH}`);
    return { copied, skipped, total: imageFiles.length };
  } catch (error) {
    console.error("\u274C Errore durante la sincronizzazione:", error);
    throw error;
  }
}

// server/routes.ts
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { eq as eq2, and as and2, inArray, sql as sql2 } from "drizzle-orm";
import Stripe from "stripe";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
var supabaseAdmin = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY) : null;
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${buf.toString("hex")}`;
}
function verifyPassword(password, stored) {
  if (typeof stored !== "string") return false;
  if (stored.startsWith("scrypt:")) {
    const parts = stored.split(":");
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const hash = parts[2];
    const buf = crypto.scryptSync(password, salt, 64).toString("hex");
    return buf === hash;
  }
  return stored === password;
}
var supabaseAnon = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null;
async function getAuthFromToken(req) {
  const authHdr = req.headers["authorization"] || req.headers["Authorization"];
  const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
  if (!token) return null;
  let uid;
  let email;
  let isAdmin = false;
  let firstName = void 0;
  let lastName = void 0;
  let phone = void 0;
  let address = void 0;
  let city = void 0;
  let postalCode = void 0;
  let province = void 0;
  let country = void 0;
  let verifiedByAdmin = false;
  if (supabaseAdmin) {
    try {
      const r = await supabaseAdmin.auth.getUser(token);
      if (!r.error && r.data?.user) {
        uid = r.data.user.id;
        email = r.data.user.email || void 0;
        verifiedByAdmin = true;
        try {
          const p = await supabaseAdmin.from("users").select("id,email,is_admin,first_name,last_name,phone").eq("id", uid).limit(1).maybeSingle();
          if (p?.data) {
            email = p.data.email || email;
            isAdmin = !!p.data.is_admin;
            firstName = p.data.first_name;
            lastName = p.data.last_name;
            phone = p.data.phone;
          }
          const a = await supabaseAdmin.from("user_addresses").select("street,city,cap,province,country").eq("user_id", uid).limit(1).maybeSingle();
          if (a?.data) {
            address = a.data.street;
            city = a.data.city;
            postalCode = a.data.cap;
            province = a.data.province;
            country = a.data.country;
          }
        } catch (e) {
        }
      }
    } catch (e) {
    }
  }
  if (!verifiedByAdmin) {
    try {
      const parts = token.split(".");
      if (parts.length >= 2) {
        let payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        while (payloadB64.length % 4 !== 0) payloadB64 += "=";
        const json2 = Buffer.from(payloadB64, "base64").toString("utf8");
        const payload = JSON.parse(json2);
        const exp = typeof payload.exp === "number" ? payload.exp : 0;
        const nowSec = Math.floor(Date.now() / 1e3);
        const tolerance = 60;
        if (!exp || exp > nowSec - tolerance) {
          uid = String(payload.sub || payload.user_id || "");
          email = typeof payload.email === "string" ? payload.email : void 0;
          console.log(`[AUTH] Token decoded (fallback) for ${email}. Exp: ${exp}, Now: ${nowSec}, uid=${uid}`);
          console.log(`[AUTH] Fallback - supabaseAdmin exists: ${!!supabaseAdmin}, uid: ${uid}`);
          if (supabaseAdmin && uid) {
            try {
              console.log(`[AUTH] Fallback - Executing DB query for uid: ${uid}`);
              const dbUser = await supabaseAdmin.from("users").select("is_admin,first_name,last_name,phone,email").eq("id", uid).maybeSingle();
              console.log(`[AUTH] Fallback - DB query result:`, dbUser);
              if (dbUser?.data) {
                isAdmin = !!dbUser.data.is_admin;
                firstName = dbUser.data.first_name;
                lastName = dbUser.data.last_name;
                phone = dbUser.data.phone;
                email = dbUser.data.email || email;
                console.log(`[AUTH] Fallback DB query: isAdmin=${isAdmin}, firstName=${firstName}, lastName=${lastName}`);
              } else {
                console.log(`[AUTH] Fallback - No data returned from DB or error:`, dbUser?.error);
              }
            } catch (dbErr) {
              console.error("[AUTH] Fallback DB query error:", dbErr);
            }
          } else {
            console.log(`[AUTH] Fallback - Skipping DB query. supabaseAdmin: ${!!supabaseAdmin}, uid: ${uid}`);
          }
        } else {
          console.log(`[AUTH] Token expired (fallback). Exp: ${exp}, Now: ${nowSec}`);
        }
      }
    } catch (e) {
    }
  }
  if (!uid) return null;
  return {
    id: uid,
    email,
    isAdmin,
    firstName,
    lastName,
    phone,
    address,
    city,
    postalCode,
    province,
    country
  };
}
async function registerRoutes(app2) {
  console.log("\u{1F527} [SESSION] Configurazione middleware di sessione con PostgreSQL...");
  const maxAgeMs = Number(process.env.SESSION_MAX_AGE_MS || 30 * 24 * 60 * 60 * 1e3);
  console.log(`\u{1F527} [SESSION] Cookie MaxAge: ${maxAgeMs}ms`);
  const isProduction = process.env.NODE_ENV === "production";
  const isLocal = process.env.NODE_ENV !== "production" || String(process.env.HOST || process.env.APP_URL || process.env.ORIGIN || process.env.BASE_URL || "").includes("localhost");
  const useSecureCookies = !isLocal && (process.env.COOKIE_SECURE === "true" || isProduction && process.env.COOKIE_SECURE !== "false");
  console.log(`\u{1F527} [SESSION] Secure Cookie: ${useSecureCookies} (NODE_ENV=${process.env.NODE_ENV}, isLocal=${isLocal})`);
  const sameSiteEnv = String(process.env.COOKIE_SAMESITE || "lax").toLowerCase();
  let sameSiteOpt = sameSiteEnv === "none" ? "none" : sameSiteEnv === "strict" ? "strict" : "lax";
  if (sameSiteOpt === "none" && !useSecureCookies) {
    console.warn("\u{1F527} [SESSION] SameSite=None richiede Secure; fallback a Lax su ambiente non sicuro");
    sameSiteOpt = "lax";
  }
  const pgSession = connectPgSimple(session);
  app2.use(session({
    store: new pgSession({
      pool,
      tableName: "session",
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 60 * 24
      // Prune expired sessions every 24 hours
    }),
    secret: process.env.SESSION_SECRET || "big-gimmy-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      maxAge: maxAgeMs,
      secure: useSecureCookies,
      httpOnly: true,
      sameSite: sameSiteOpt,
      path: "/",
      domain: process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN.length > 0 ? process.env.COOKIE_DOMAIN : void 0
    },
    rolling: true,
    // Refreshes cookie on every response
    name: "biggimmy-session"
  }));
  console.log("\u2705 [SESSION] Middleware di sessione PostgreSQL configurato");
  const noCache = (res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  };
  const ensureAuth = async (req, res, next) => {
    try {
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      console.log(`[AUTH] ensureAuth headers: Authorization present=${!!authHdr}, Cookie present=${!!req.headers["cookie"]}`);
      const tokenAuth = await getAuthFromToken(req);
      if (tokenAuth) {
        console.log(`[AUTH] Token verificato per utente: ${tokenAuth.email}`);
        req.user = {
          ...tokenAuth,
          authenticated: true,
          firstName: tokenAuth.firstName,
          lastName: tokenAuth.lastName
        };
        if (req.session) {
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const sessUser = req.session.user;
          if (!sessUser || sessUser.id !== tokenAuth.id) {
            req.session.user = {
              ...tokenAuth,
              authenticated: true,
              loginTime: now,
              updatedAt: now
            };
            req.session.siteAccessGranted = true;
            req.session.save((err) => {
              if (err) console.error("[AUTH] Error syncing session from token:", err);
            });
          }
        }
        return next();
      }
      const sessionUser = req.session?.user;
      if (sessionUser && sessionUser.authenticated) {
        const loginTime = new Date(sessionUser.loginTime).getTime();
        const now = Date.now();
        const logicalMaxAge = Number(process.env.SESSION_MAX_AGE_MS || 30 * 24 * 60 * 60 * 1e3);
        if (now - loginTime > logicalMaxAge) {
          console.log(`[AUTH] Sessione scaduta logicamente per: ${sessionUser.email}`);
          req.session.destroy(() => {
          });
          return res.status(401).json({ success: false, message: "Sessione scaduta" });
        }
        console.log(`[AUTH] Sessione valida per: ${sessionUser.email}`);
        req.user = sessionUser;
        return next();
      }
      console.log(`[AUTH] Accesso negato: Nessuna credenziale valida`);
      return res.status(401).json({ success: false, message: "Non autenticato" });
    } catch (e) {
      console.error("[AUTH] Errore middleware:", e);
      return res.status(500).json({ success: false, message: "Errore interno" });
    }
  };
  const ensureAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: "Accesso negato" });
    }
    next();
  };
  app2.post("/api/auth/login", async (req, res) => {
    noCache(res);
    try {
      const { email, password, code } = req.body || {};
      console.log(`[AUTH-FIX] Tentativo di login per: ${email || (code ? "Codice Accesso" : "Sconosciuto")}`);
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      if (typeof code === "string" && code.length > 0) {
        if (code !== ADMIN_CODE) {
          console.warn(`[AUTH] Codice admin non valido`);
          return res.status(401).json({ success: false, message: "Codice non valido" });
        }
        if (!req.session) {
          return res.status(500).json({ success: false, message: "Errore di configurazione del server" });
        }
        const now = (/* @__PURE__ */ new Date()).toISOString();
        let sessionUserId = Date.now();
        const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
        if (client) {
          try {
            const { data } = await client.from("users").select("id,email,first_name,last_name").eq("email", adminEmail).limit(1).maybeSingle();
            if (data && data.id) {
              sessionUserId = String(data.id);
            } else {
              const newId = crypto.randomUUID();
              await client.from("users").insert({ id: newId, email: adminEmail, created_at: now, updated_at: now, first_name: "Admin", last_name: "User" });
              sessionUserId = newId;
            }
          } catch {
          }
        }
        req.session.user = {
          id: sessionUserId,
          email: adminEmail,
          authenticated: true,
          isAdmin: true,
          loginTime: now,
          createdAt: now,
          updatedAt: now,
          firstName: "Admin",
          lastName: "User"
        };
        req.session.siteAccessGranted = true;
        try {
          await new Promise((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error("[AUTH] Error saving session in admin login:", err);
                reject(err);
              } else {
                console.log(`[AUTH] Login Admin completato: ${adminEmail}`);
                resolve();
              }
            });
          });
        } catch (saveErr) {
          console.error("[AUTH] Session save critical error in admin login:", saveErr);
          return res.status(500).json({
            success: false,
            message: "Errore salvataggio sessione durante login admin"
          });
        }
        noCache(res);
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
          const now = (/* @__PURE__ */ new Date()).toISOString();
          const devId = crypto.randomUUID();
          req.session.user = {
            id: String(devId),
            email: String(email),
            authenticated: true,
            isAdmin: false,
            loginTime: now,
            createdAt: now,
            updatedAt: now,
            firstName: "User",
            lastName: "Dev"
          };
          req.session.siteAccessGranted = true;
          console.log(`[AUTH] Login DEV Session creato per: ${email}`);
          await new Promise((resolve) => req.session.save(() => resolve()));
          return res.json({ success: true, message: "Login effettuato con successo (dev session)", user: { email, isAdmin: false } });
        }
        let authUser = null;
        try {
          console.log(`[AUTH] Tentativo Supabase Auth signInWithPassword per ${email}...`);
          const { data, error } = await client.auth.signInWithPassword({ email, password });
          if (!error && data.user) {
            authUser = data.user;
            console.log(`[AUTH] Supabase Auth successo. UID: ${authUser.id}`);
          } else {
            console.warn(`[AUTH] Supabase Auth fallito: ${error?.message}`);
          }
        } catch (e) {
          console.error(`[AUTH] Supabase Auth Exception:`, e);
        }
        if (authUser) {
          let profile = null;
          try {
            const { data } = await client.from("users").select("id,email,first_name,last_name,is_admin").eq("id", authUser.id).maybeSingle();
            profile = data;
          } catch (e) {
            console.error(`[AUTH] Profile fetch error:`, e);
          }
          try {
            if (!profile || !profile.id) {
              const meta = authUser?.user_metadata || {};
              const now2 = (/* @__PURE__ */ new Date()).toISOString();
              const insertPayload = {
                id: authUser.id,
                email: authUser.email,
                first_name: meta.first_name || meta.firstName || "Utente",
                last_name: meta.last_name || meta.lastName || "BigGimmy",
                is_admin: false,
                created_at: now2,
                updated_at: now2
              };
              await client.from("users").insert(insertPayload);
              profile = insertPayload;
              console.log(`[AUTH] Created profile row for ${authUser.email}`);
            }
          } catch (e) {
            console.warn(`[AUTH] Upsert profile failed:`, e);
          }
          const now = (/* @__PURE__ */ new Date()).toISOString();
          req.session.user = {
            id: authUser.id,
            email: authUser.email,
            authenticated: true,
            isAdmin: !!profile?.is_admin,
            loginTime: now,
            createdAt: authUser.created_at || now,
            updatedAt: now,
            firstName: profile?.first_name,
            lastName: profile?.last_name
          };
          req.session.siteAccessGranted = true;
          try {
            await new Promise((resolve, reject) => {
              req.session.save((err) => {
                if (err) {
                  console.error("[AUTH] Error saving session in login:", err);
                  reject(err);
                } else {
                  console.log(`[AUTH] Sessione server creata via Supabase Auth per: ${email}`);
                  resolve();
                }
              });
            });
          } catch (saveErr) {
            console.error("[AUTH] Session save critical error in login:", saveErr);
            return res.status(500).json({
              success: false,
              message: "Errore salvataggio sessione durante login"
            });
          }
          return res.json({
            success: true,
            message: "Login effettuato con successo",
            user: req.session.user
          });
        }
        try {
          let existing = null;
          try {
            const { rows } = await pool.query(
              "select id,email,password,first_name,last_name,is_admin,created_at,updated_at from public.users where email=$1 limit 1",
              [email]
            );
            existing = rows && rows[0] ? rows[0] : null;
          } catch {
          }
          if (existing?.id && verifyPassword(password, String(existing.password))) {
            const now = (/* @__PURE__ */ new Date()).toISOString();
            req.session.user = {
              id: existing.id,
              email: existing.email,
              authenticated: true,
              isAdmin: !!existing.is_admin,
              loginTime: now,
              createdAt: existing.created_at ? new Date(existing.created_at).toISOString() : now,
              updatedAt: now,
              firstName: existing.first_name,
              lastName: existing.last_name
            };
            req.session.siteAccessGranted = true;
            try {
              await new Promise((resolve, reject) => {
                req.session.save((err) => {
                  if (err) {
                    console.error("[AUTH] Error saving session in fallback login:", err);
                    reject(err);
                  } else {
                    console.log(`[AUTH] Login fallback completato per: ${email}`);
                    resolve();
                  }
                });
              });
            } catch (saveErr) {
              console.error("[AUTH] Session save critical error in fallback login:", saveErr);
              return res.status(500).json({
                success: false,
                message: "Errore salvataggio sessione durante login fallback"
              });
            }
            return res.json({ success: true, message: "Login effettuato con successo (fallback)", user: req.session.user });
          }
        } catch (e) {
          console.warn(`[AUTH] Fallback login error:`, e);
        }
        return res.status(401).json({ success: false, message: "Credenziali non valide" });
      }
      const { username, password: pwd } = req.body;
      if (username || pwd) {
        return res.status(401).json({ success: false, message: "Login via username/password disabilitato" });
      }
      return res.status(400).json({ success: false, message: "Richiesta di login non valida (parametri mancanti)" });
    } catch (error) {
      console.error(`[AUTH] Errore Login:`, error);
      res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    noCache(res);
    const userEmail = req.session?.user?.email || "Anonimo";
    console.log(`[AUTH] Logout richiesto per: ${userEmail}`);
    req.session.destroy((err) => {
      if (err) {
        console.error(`[AUTH] Errore distruzione sessione:`, err);
        return res.status(500).json({ success: false, message: "Errore durante il logout" });
      }
      res.clearCookie("biggimmy-session", { path: "/" });
      console.log(`[AUTH] Logout completato e cookie rimosso`);
      return res.json({ success: true, message: "Logout effettuato con successo" });
    });
  });
  app2.get("/api/auth/diagnostics", async (req, res) => {
    try {
      const tokenAuth = await getAuthFromToken(req);
      const cookieUser = req.session?.user || null;
      const result = {
        success: true,
        tokenAuthenticated: !!tokenAuth,
        cookieAuthenticated: !!(cookieUser && cookieUser.authenticated),
        tokenUser: tokenAuth || null,
        cookieUser: cookieUser || null,
        metadata: null,
        rlsCheck: null
      };
      if (supabaseAdmin && (tokenAuth?.id || cookieUser?.id)) {
        const uid = tokenAuth?.id || cookieUser?.id;
        const meta = await supabaseAdmin.auth.admin.getUserById(uid);
        result.metadata = meta?.data?.user?.user_metadata || meta?.data?.user?.raw_user_meta_data || null;
      }
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      if (authHdr && typeof authHdr === "string" && authHdr.startsWith("Bearer ")) {
        const token = authHdr.slice(7);
        const client = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } }) : null;
        if (client && (tokenAuth?.id || cookieUser?.id)) {
          const uid = tokenAuth?.id || cookieUser?.id;
          const own = await client.from("users").select("id,email").eq("id", uid).limit(1);
          const others = await client.from("users").select("id,email").neq("id", uid).limit(1);
          result.rlsCheck = {
            ownStatus: !!own?.data?.length,
            othersStatus: !!others?.data?.length,
            ownError: own?.error || null,
            othersError: others?.error || null
          };
        }
      }
      return res.json(result);
    } catch {
      return res.status(500).json({ success: false });
    }
  });
  app2.get("/api/auth/metadata", async (req, res) => {
    try {
      if (!supabaseAdmin) return res.status(400).json({ success: false });
      const tokenAuth = await getAuthFromToken(req);
      const cookieUser = req.session?.user || null;
      const uid = tokenAuth?.id || cookieUser?.id;
      if (!uid) return res.status(401).json({ success: false });
      const meta = await supabaseAdmin.auth.admin.getUserById(uid);
      const raw = meta?.data?.user?.raw_user_meta_data || meta?.data?.user?.user_metadata || null;
      return res.json({ success: true, uid, raw });
    } catch {
      return res.status(500).json({ success: false });
    }
  });
  app2.put("/api/auth/profile", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const updates = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string") updates.phone = phone;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      updates.updated_at = now;
      let persisted = false;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          const { error } = await supabaseAdmin.from("users").update(updates).eq("id", String(userId));
          if (!error) persisted = true;
        } catch {
        }
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string") sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({
        success: true,
        persisted,
        user: {
          id: userId,
          email: tokenAuth?.email || sess?.user?.email,
          firstName: typeof firstName === "string" ? firstName : sess?.user?.firstName,
          lastName: typeof lastName === "string" ? lastName : sess?.user?.lastName,
          phone: typeof phone === "string" ? phone : sess?.user?.phone,
          updatedAt: now
        }
      });
    } catch (err) {
      console.error("[AUTH] /profile - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/auth/profile", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const client = supabaseAdmin || supabaseAnon;
      let profile = null;
      if (client) {
        try {
          const { data } = await client.from("users").select("id,email,first_name,last_name,phone,updated_at").eq("id", String(userId)).limit(1).maybeSingle();
          profile = data || null;
        } catch {
        }
      }
      return res.json({
        success: true,
        user: {
          id: userId,
          email: tokenAuth?.email || sess?.user?.email || profile?.email,
          firstName: profile?.first_name ?? sess?.user?.firstName,
          lastName: profile?.last_name ?? sess?.user?.lastName,
          phone: profile?.phone ?? sess?.user?.phone,
          updatedAt: profile?.updated_at ?? sess?.user?.updatedAt
        }
      });
    } catch (err) {
      console.error("[AUTH] /profile [GET] - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/auth/me", async (req, res) => {
    noCache(res);
    console.log(`[AUTH] GET /api/auth/me - Request received. SessionID: ${req.sessionID}`);
    console.log(`[AUTH] GET /api/auth/me - Headers: Authorization=${!!req.headers["authorization"]}, Cookie=${!!req.headers["cookie"]}`);
    try {
      console.log(`[DEBUG] /api/auth/me - Start. SessionID: ${req.sessionID}`);
      if (!req.session) {
        console.error("[AUTH] /me - Critical: req.session is undefined!");
        return res.status(500).json({ success: false, message: "Session store error" });
      }
      let tokenAuth = null;
      try {
        tokenAuth = await getAuthFromToken(req);
      } catch (tokenErr) {
        console.error("[AUTH] /me - Token verification error:", tokenErr);
      }
      if (tokenAuth) {
        console.log(`[AUTH] /me - Bearer present: true, email=${tokenAuth.email}, id=${tokenAuth.id}, isAdmin from token=${tokenAuth.isAdmin}`);
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const existing = req.session?.user || {};
        console.log(`[AUTH] /me - existing.isAdmin=${existing.isAdmin}, tokenAuth.isAdmin=${tokenAuth.isAdmin}`);
        const mergedUser = {
          id: tokenAuth.id || existing.id,
          email: existing.email || tokenAuth.email,
          authenticated: true,
          isAdmin: !!(tokenAuth.isAdmin ?? existing.isAdmin),
          firstName: tokenAuth.firstName ?? existing.firstName,
          lastName: tokenAuth.lastName ?? existing.lastName,
          phone: existing.phone ?? tokenAuth.phone,
          address: existing.address ?? tokenAuth.address,
          city: existing.city ?? tokenAuth.city,
          postalCode: existing.postalCode ?? tokenAuth.postalCode,
          province: existing.province ?? tokenAuth.province,
          country: existing.country ?? tokenAuth.country,
          loginTime: existing.loginTime || now,
          updatedAt: now
        };
        req.session.user = mergedUser;
        req.session.siteAccessGranted = true;
        try {
          await new Promise((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error("[AUTH] Error saving session in /me:", err);
                reject(err);
              } else {
                console.log("[AUTH] Session saved successfully in /me");
                resolve();
              }
            });
          });
        } catch (saveErr) {
          console.error("[AUTH] Session save critical error:", saveErr);
          return res.status(500).json({
            success: false,
            message: "Errore salvataggio sessione"
          });
        }
        console.log(`[AUTH] /me - Returning mergedUser with isAdmin=${mergedUser.isAdmin}, email=${mergedUser.email}`);
        return res.json({ success: true, authenticated: true, user: mergedUser });
      }
      const user = req.session?.user;
      console.log(`[AUTH] /me - Bearer present: false, cookie present=${!!req.headers["cookie"]}, sessionUser=${!!user}`);
      if (user && user.authenticated) {
        console.log(`[AUTH] /me - Sessione cookie valida: ${user.email}, isAdmin from cookie=${user.isAdmin}`);
        let dbIsAdmin = user.isAdmin;
        let dbFirstName = user.firstName;
        let dbLastName = user.lastName;
        let dbPhone = user.phone;
        if (supabaseAdmin && user.id) {
          try {
            const dbUser = await supabaseAdmin.from("users").select("is_admin,first_name,last_name,phone").eq("id", user.id).maybeSingle();
            if (dbUser?.data) {
              dbIsAdmin = !!dbUser.data.is_admin;
              dbFirstName = dbUser.data.first_name;
              dbLastName = dbUser.data.last_name;
              dbPhone = dbUser.data.phone;
              console.log(`[AUTH] /me - DB refresh: isAdmin=${dbIsAdmin}, firstName=${dbFirstName}, lastName=${dbLastName}`);
            }
          } catch (e) {
            console.error("[AUTH] /me - Error refreshing from DB:", e);
          }
        }
        const payload = {
          id: user.id ?? 0,
          email: user.email ?? (user.username ? `${user.username}@local` : void 0),
          firstName: dbFirstName,
          lastName: dbLastName,
          phone: dbPhone,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          province: user.province,
          country: user.country,
          createdAt: user.createdAt ?? user.loginTime ?? (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: user.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
          username: user.username,
          isAdmin: dbIsAdmin
        };
        req.session.user = { ...user, isAdmin: dbIsAdmin, firstName: dbFirstName, lastName: dbLastName, phone: dbPhone };
        console.log(`[AUTH] /me - Returning cookie user with isAdmin=${payload.isAdmin}, email=${payload.email}`);
        return res.json({ success: true, authenticated: true, user: payload });
      }
      console.log(`[AUTH] /me - Returning unauthenticated (no token, no session). SessionID: ${req.sessionID}`);
      return res.json({ success: true, authenticated: false });
    } catch (err) {
      console.error("[AUTH] /me - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.put("/api/auth/me", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      let userId = tokenAuth?.id || sess?.user?.id;
      console.log(`[AUTH] PUT /me - Start update for userId: ${userId}`);
      if (!userId && sess?.siteAccessGranted) {
        const now2 = (/* @__PURE__ */ new Date()).toISOString();
        sess.user = {
          id: "guest",
          email: void 0,
          authenticated: true,
          isAdmin: false,
          firstName: sess?.user?.firstName,
          lastName: sess?.user?.lastName,
          phone: sess?.user?.phone,
          loginTime: now2,
          createdAt: now2,
          updatedAt: now2
        };
        userId = "guest";
      }
      if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
      const schema = z.object({
        firstName: z.string().trim().min(1, "Nome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato nome non valido"),
        lastName: z.string().trim().min(1, "Cognome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato cognome non valido"),
        phone: z.union([
          z.string().trim().length(0),
          z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/)
        ]).optional()
      }).strip();
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      const { firstName, lastName, phone } = parsed.data;
      const updates = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string" && phone.trim().length > 0) updates.phone = phone;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      updates.updated_at = now;
      let dbUpdated = false;
      let updateError = null;
      if (supabaseAdmin && Object.keys(updates).length > 0 && userId !== "guest") {
        try {
          console.log(`[AUTH] Updating public.users (Admin) for ${userId}`, updates);
          const { error } = await supabaseAdmin.from("users").update(updates).eq("id", String(userId));
          if (error) {
            console.warn(`[AUTH] DB Update (Admin) failed:`, error);
            updateError = error;
          } else {
            console.log(`[AUTH] DB Update (Admin) success`);
            dbUpdated = true;
          }
        } catch (e) {
          console.error(`[AUTH] DB Update (Admin) exception:`, e);
          updateError = e;
        }
      }
      if (!dbUpdated && Object.keys(updates).length > 0 && userId !== "guest") {
        const authHdr = req.headers["authorization"] || req.headers["Authorization"];
        const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
        if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
          try {
            console.log(`[AUTH] Updating public.users (User Token) for ${userId}`);
            const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
              global: { headers: { Authorization: `Bearer ${token}` } }
            });
            const { error } = await client.from("users").update(updates).eq("id", String(userId));
            if (error) {
              console.warn(`[AUTH] DB Update (User) failed:`, error);
              updateError = error;
            } else {
              console.log(`[AUTH] DB Update (User) success`);
              dbUpdated = true;
              updateError = null;
            }
          } catch (e) {
            console.error(`[AUTH] DB Update (User) exception:`, e);
          }
        } else {
          if (!supabaseAdmin) console.warn(`[AUTH] No Admin client and no Token available for DB update`);
        }
      }
      if (!dbUpdated && updateError) {
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string" && phone.trim().length > 0) sess.user.phone = phone;
        sess.user.updatedAt = now;
        try {
          await new Promise((resolve, reject) => {
            req.session.save((err) => {
              if (err) {
                console.error("[AUTH] Error saving session in /me [PUT]:", err);
                reject(err);
              } else {
                console.log("[AUTH] Session saved with profile updates");
                resolve();
              }
            });
          });
        } catch (saveErr) {
          console.error("[AUTH] Session save critical error in PUT /me:", saveErr);
          return res.status(500).json({
            success: false,
            message: "Errore salvataggio sessione durante aggiornamento profilo"
          });
        }
      }
      return res.json({ success: true, dbUpdated });
    } catch (err) {
      console.error("[AUTH] /me [PUT] - Errore:", err);
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.patch("/api/auth/me", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      let userId = tokenAuth?.id || sess?.user?.id;
      if (!userId && sess?.siteAccessGranted) {
        const now2 = (/* @__PURE__ */ new Date()).toISOString();
        sess.user = {
          id: "guest",
          email: void 0,
          authenticated: true,
          isAdmin: false,
          firstName: sess?.user?.firstName,
          lastName: sess?.user?.lastName,
          phone: sess?.user?.phone,
          loginTime: now2,
          createdAt: now2,
          updatedAt: now2
        };
        userId = "guest";
      }
      if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
      const schema = z.object({
        firstName: z.string().trim().min(1, "Nome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato nome non valido"),
        lastName: z.string().trim().min(1, "Cognome obbligatorio").max(64).regex(/^[\p{L}][\p{L} \-']*$/u, "Formato cognome non valido"),
        phone: z.union([
          z.string().trim().length(0),
          z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/)
        ]).optional()
      }).strip();
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      const { firstName, lastName, phone } = parsed.data;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string" && phone.trim().length > 0) updates.phone = phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0 && userId !== "guest") {
        try {
          await supabaseAdmin.from("users").update(updates).eq("id", String(userId));
        } catch {
        }
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string" && phone.trim().length > 0) sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.put("/api/auth/profile", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const schema = z.object({
        firstName: z.string().trim().min(1).max(64).regex(/^[\p{L}][\p{L} \-']*$/u),
        lastName: z.string().trim().min(1).max(64).regex(/^[\p{L}][\p{L} \-']*$/u),
        phone: z.union([z.string().trim().length(0), z.string().trim().min(7).max(20).regex(/^[+]?[\d\s\-().]{7,20}$/)]).optional()
      }).strip();
      const parsed = schema.safeParse({ firstName, lastName, phone });
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: "Dati non validi", errors: parsed.error.errors });
      }
      const data = parsed.data;
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {};
      if (typeof data.firstName === "string") updates.first_name = data.firstName;
      if (typeof data.lastName === "string") updates.last_name = data.lastName;
      if (typeof data.phone === "string" && data.phone.trim().length > 0) updates.phone = data.phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          await supabaseAdmin.from("users").update(updates).eq("id", String(userId));
        } catch {
        }
      }
      if (sess?.user) {
        if (typeof data.firstName === "string") sess.user.firstName = data.firstName;
        if (typeof data.lastName === "string") sess.user.lastName = data.lastName;
        if (typeof data.phone === "string" && data.phone.trim().length > 0) sess.user.phone = data.phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.patch("/api/auth/profile", async (req, res) => {
    noCache(res);
    try {
      const sess = req.session;
      const tokenAuth = await getAuthFromToken(req);
      const userId = tokenAuth?.id || sess?.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { firstName, lastName, phone } = req.body || {};
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const updates = {};
      if (typeof firstName === "string") updates.first_name = firstName;
      if (typeof lastName === "string") updates.last_name = lastName;
      if (typeof phone === "string") updates.phone = phone;
      updates.updated_at = now;
      if (supabaseAdmin && Object.keys(updates).length > 0) {
        try {
          await supabaseAdmin.from("users").update(updates).eq("id", String(userId));
        } catch {
        }
      }
      if (sess?.user) {
        if (typeof firstName === "string") sess.user.firstName = firstName;
        if (typeof lastName === "string") sess.user.lastName = lastName;
        if (typeof phone === "string") sess.user.phone = phone;
        sess.user.updatedAt = now;
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/auth/me/orders", async (req, res) => {
    try {
      const sanitized = MOCK_ORDERS.map((o) => ({
        id: o.id,
        snipcartOrderId: o.snipcartOrderId,
        total: o.total,
        status: o.status,
        items: o.items,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt
      }));
      return res.json({ success: true, orders: sanitized });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.post("/api/access/verify", async (req, res) => {
    try {
      const { code } = req.body || {};
      const ADMIN_CODE = process.env.ADMIN_ACCESS_CODE || "XNCahKl09P!298Gq20LkAns!1";
      if (typeof code !== "string" || code.length === 0) {
        return res.status(400).json({ success: false, message: "Codice mancante" });
      }
      if (code !== ADMIN_CODE) {
        return res.status(401).json({ success: false, message: "Codice non valido" });
      }
      req.session.siteAccessGranted = true;
      return res.json({ success: true, granted: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/access/status", async (req, res) => {
    try {
      const sess = req.session;
      const grantedByCode = !!sess?.siteAccessGranted;
      const grantedBySession = !!sess?.user?.authenticated;
      const tokenAuth = await getAuthFromToken(req);
      const granted = grantedByCode || grantedBySession || !!tokenAuth;
      return res.json({ success: true, granted });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName, phone, address, city, postalCode, province, country } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email e password sono obbligatori" });
      }
      const emailOk = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const passOk = typeof password === "string" && password.length >= 6;
      const firstOk = !firstName || typeof firstName === "string" && firstName.trim().length >= 2;
      const lastOk = !lastName || typeof lastName === "string" && lastName.trim().length >= 2;
      const phoneOk = !phone || typeof phone === "string" && /^(\+?\d{1,3}\s?)?(\d[\s-]?){6,}$/.test(phone);
      const addrOk = !address || typeof address === "string" && address.trim().length >= 2;
      const cityOk = !city || typeof city === "string" && city.trim().length >= 2;
      const capOk = !postalCode || typeof postalCode === "string" && /^\d{5}$/.test(postalCode);
      const provOk = !province || typeof province === "string" && /^[A-Z]{2}$/.test(province);
      if (!emailOk || !passOk || !firstOk || !lastOk || !phoneOk || !addrOk || !cityOk || !capOk || !provOk) {
        return res.status(400).json({ success: false, message: "Dati non validi" });
      }
      const client = supabaseAdmin || (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY ? createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null);
      const now = (/* @__PURE__ */ new Date()).toISOString();
      let userId = crypto.randomUUID();
      let persisted = false;
      if (supabaseAnon) {
        try {
          const { data, error } = await supabaseAnon.auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: firstName,
                last_name: lastName,
                phone,
                address,
                city,
                postal_code: postalCode,
                province,
                country
              }
            }
          });
          if (!error && data?.user?.id) {
            userId = String(data.user.id);
            if (supabaseAdmin) {
              try {
                await supabaseAdmin.auth.admin.updateUserById(userId, { email_confirmed_at: (/* @__PURE__ */ new Date()).toISOString() });
              } catch {
              }
            }
          }
        } catch (e) {
          console.warn("[AUTH] Supabase Auth signUp fallito:", e);
        }
      }
      if (client) {
        try {
          const existing = await client.from("users").select("id,email").eq("email", email).limit(1).maybeSingle();
          if (existing?.data?.id) {
            userId = String(existing.data.id);
            const { error } = await client.from("users").update({
              password: hashPassword(password),
              first_name: firstName,
              last_name: lastName,
              phone,
              address,
              city,
              postal_code: postalCode,
              province,
              country,
              updated_at: now
            }).eq("id", userId);
            if (!error) persisted = true;
          } else {
            const { error } = await client.from("users").insert({
              id: userId,
              email,
              password: hashPassword(password),
              first_name: firstName,
              last_name: lastName,
              phone,
              address,
              city,
              postal_code: postalCode,
              province,
              country,
              created_at: now,
              updated_at: now,
              is_admin: false
            });
            if (!error) persisted = true;
            else {
              console.warn("[AUTH] Insert su 'users' fallito, ritento su 'users_backup'");
              const { error: err2 } = await client.from("users_backup").insert({
                id: userId,
                email,
                password: hashPassword(password),
                first_name: firstName,
                last_name: lastName,
                phone,
                address,
                city,
                postal_code: postalCode,
                province,
                country,
                created_at: now,
                updated_at: now,
                is_admin: false
              });
              if (!err2) persisted = true;
            }
          }
        } catch (e) {
          console.error("[AUTH] Registrazione DB errore:", e);
        }
      }
      if (req.session) {
        req.session.user = {
          id: userId,
          email,
          authenticated: true,
          isAdmin: false,
          createdAt: now,
          updatedAt: now,
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          province,
          country
        };
        await new Promise((resolve) => req.session.save(() => resolve()));
      }
      return res.json({ success: true, persisted, user: { id: userId, email } });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  const MOCK_ORDERS = [
    {
      id: 1001,
      userId: 501,
      snipcartOrderId: "SNIP-001001",
      total: 4599,
      status: "ordered",
      items: [
        { id: "p-1", name: "Proteine Whey 1kg", quantity: 1, price: 2999 },
        { id: "p-2", name: "Creatina Monoidrato 300g", quantity: 1, price: 1600 }
      ],
      shippingAddress: { street: "Via Roma 10", city: "Torino", postalCode: "10121", province: "TO" },
      billingAddress: { street: "Via Roma 10", city: "Torino", postalCode: "10121", province: "TO" },
      createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      userEmail: "mario.rossi@example.com",
      userFirstName: "Mario",
      userLastName: "Rossi"
    },
    {
      id: 1002,
      userId: 502,
      snipcartOrderId: "SNIP-001002",
      total: 8999,
      status: "completed",
      items: [
        { id: "p-3", name: "Omega-3 120 cps", quantity: 2, price: 1999 },
        { id: "p-4", name: "Multivitaminico", quantity: 1, price: 5001 }
      ],
      shippingAddress: { street: "Via Garibaldi 5", city: "Milano", postalCode: "20100", province: "MI" },
      billingAddress: { street: "Via Garibaldi 5", city: "Milano", postalCode: "20100", province: "MI" },
      createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 48).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      userEmail: "laura.bianchi@example.com",
      userFirstName: "Laura",
      userLastName: "Bianchi"
    },
    {
      id: 1003,
      userId: 503,
      snipcartOrderId: "SNIP-001003",
      total: 6599,
      status: "processing",
      items: [
        { id: "p-5", name: "Termogenico X", quantity: 1, price: 3299 },
        { id: "p-6", name: "Barrette Proteiche (box)", quantity: 1, price: 3300 }
      ],
      shippingAddress: { street: "Corso Francia 45", city: "Torino", postalCode: "10138", province: "TO" },
      billingAddress: { street: "Corso Francia 45", city: "Torino", postalCode: "10138", province: "TO" },
      createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 6).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      userEmail: "giulia.verdi@example.com",
      userFirstName: "Giulia",
      userLastName: "Verdi"
    }
  ];
  const MOCK_USERS = [
    {
      id: 501,
      email: "mario.rossi@example.com",
      firstName: "Mario",
      lastName: "Rossi",
      isAdmin: false
    },
    {
      id: 502,
      email: "laura.bianchi@example.com",
      firstName: "Laura",
      lastName: "Bianchi",
      isAdmin: false
    },
    {
      id: 503,
      email: "giulia.verdi@example.com",
      firstName: "Giulia",
      lastName: "Verdi",
      isAdmin: false
    }
  ];
  app2.get("/api/admin/orders", ensureAuth, ensureAdmin, async (req, res) => {
    try {
      return res.json(MOCK_ORDERS);
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/admin/users", ensureAuth, ensureAdmin, async (req, res) => {
    try {
      return res.json({ success: true, users: MOCK_USERS });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      return res.status(200).json({ contacts: contacts2 });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while fetching contacts"
      });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const { search, brand, priceRange, sortBy } = req.query;
      const timestamp2 = Math.floor(Date.now() / (5 * 60 * 1e3));
      res.set({
        "Cache-Control": "public, max-age=300, stale-while-revalidate=1800",
        "ETag": `products-${timestamp2}-${search || "no-search"}-${brand || "no-brand"}-${priceRange || "no-range"}-${sortBy || "default"}`
      });
      let products2;
      if (search || brand || priceRange || sortBy) {
        products2 = await storage.searchProducts(
          search,
          {
            brandSlug: brand,
            priceRange,
            sortBy
          }
        );
      } else {
        products2 = await storage.searchProducts("", {});
      }
      res.json(products2);
    } catch (error) {
      console.error("Error fetching all products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  app2.get("/api/products/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const { search, brand, priceRange, sortBy } = req.query;
      const timestamp2 = Math.floor(Date.now() / (5 * 60 * 1e3));
      res.set({
        "Cache-Control": "no-cache, must-revalidate",
        // Nessun cache - aggiornamenti istantanei
        "ETag": `products-${category}-${timestamp2}-${search || "no-search"}-${brand || "no-brand"}-${priceRange || "no-range"}-${sortBy || "default"}`
      });
      let products2;
      if (search || brand || priceRange || sortBy) {
        products2 = await storage.searchProducts(
          search,
          {
            categorySlug: category,
            brandSlug: brand,
            priceRange,
            sortBy
          }
        );
      } else {
        products2 = await storage.getProductsByCategory(category);
      }
      res.json(products2);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  app2.get("/api/base-products/:category", async (req, res) => {
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
  app2.get("/api/base-product/:slug/variants", async (req, res) => {
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
  app2.get("/api/product/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      let product = await storage.getProductBySlug(slug);
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          const redirectUrl = `/api/product/${redirect.newSlug}`;
          return res.redirect(301, redirectUrl);
        }
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      const options = await storage.getProductOptionsById(product.id);
      const min_price_cents = options.length > 0 ? Math.min(...options.map((opt) => opt.priceCents)) : null;
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
  app2.get("/api/product/:slug/details", async (req, res) => {
    try {
      const { slug } = req.params;
      let product = await storage.getProductBySlugWithDetails(slug);
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          const redirectUrl = `/api/product/${redirect.newSlug}/details`;
          return res.redirect(301, redirectUrl);
        }
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
  app2.get("/api/product/:slug/options", async (req, res) => {
    try {
      const { slug } = req.params;
      let product = await storage.getProductBySlug(slug);
      if (!product) {
        const redirect = await storage.findRedirectByOldSlug(slug);
        if (redirect) {
          const redirectUrl = `/api/product/${redirect.newSlug}/options`;
          return res.redirect(301, redirectUrl);
        }
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      const options = await storage.getProductOptionsById(product.id);
      const variants = options.map((option) => ({
        id: option.id,
        product_id: option.productId,
        flavor: option.flavor || "",
        size: option.size || "",
        price_cents: option.priceCents,
        price: option.priceCents / 100,
        original_price_cents: option.originalPriceCents ?? null,
        originalPrice: option.originalPriceCents ? option.originalPriceCents / 100 : void 0,
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
  app2.get("/api/categories", async (req, res) => {
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
  app2.get("/api/brands", async (req, res) => {
    try {
      const { category, search } = req.query;
      let brands2;
      if (category || search) {
        brands2 = await storage.getBrandsFilteredByContext({
          categorySlug: category,
          searchQuery: search
        });
      } else {
        brands2 = await storage.getBrands();
      }
      res.json(brands2);
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch brands"
      });
    }
  });
  app2.post("/api/brands", async (req, res) => {
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
  app2.post("/api/products", async (req, res) => {
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
  app2.post("/api/product-images", async (req, res) => {
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
  app2.post("/api/product-sizes", async (req, res) => {
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
  app2.post("/api/product-availability", async (req, res) => {
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
  app2.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
      }
      res.json({ success: true, message: "Email inviata con successo" });
    } catch (error) {
      console.error("Errore invio email:", error);
      res.status(500).json({ error: "Errore interno del server" });
    }
  });
  app2.post("/api/sync-images", async (req, res) => {
    try {
      console.log("\u{1F504} Richiesta sincronizzazione immagini...");
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
  app2.post("/api/favorites", async (req, res) => {
    try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "userId and productId are required"
        });
      }
      let persisted = false;
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          const { error } = await client.from("user_favorites").upsert({ user_id: String(userId), product_id: Number(productId) }, { onConflict: "user_id,product_id" });
          if (!error) {
            persisted = true;
            return res.status(201).json({ success: true, message: "Product added to favorites successfully" });
          }
        } catch {
        }
      }
      try {
        const isAlreadyFavorite = await storage.isProductFavorite(parseInt(String(userId)), parseInt(String(productId)));
        if (isAlreadyFavorite) {
          return res.status(409).json({ success: false, message: "Product is already in favorites" });
        }
        const favorite = await storage.addToFavorites(parseInt(String(userId)), parseInt(String(productId)));
        return res.status(201).json({ success: true, message: "Product added to favorites successfully", favorite });
      } catch {
        const sess = req.session;
        const favs = Array.isArray(sess?.favorites) ? sess.favorites : [];
        if (!favs.includes(Number(productId))) {
          favs.push(Number(productId));
        }
        req.session.favorites = favs;
        if (!persisted) {
          return res.status(201).json({ success: true, message: "Product added to favorites successfully" });
        }
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add product to favorites"
      });
    }
  });
  app2.delete("/api/favorites", async (req, res) => {
    try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "userId and productId are required"
        });
      }
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          const { error } = await client.from("user_favorites").delete().eq("user_id", String(userId)).eq("product_id", Number(productId));
          if (!error) {
            return res.json({ success: true, message: "Product removed from favorites successfully" });
          }
        } catch {
        }
      }
      try {
        await storage.removeFromFavorites(parseInt(String(userId)), parseInt(String(productId)));
        return res.json({ success: true, message: "Product removed from favorites successfully" });
      } catch {
        const sess = req.session;
        const favs = Array.isArray(sess?.favorites) ? sess.favorites : [];
        const next = favs.filter((id) => id !== Number(productId));
        req.session.favorites = next;
        return res.json({ success: true, message: "Product removed from favorites successfully" });
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove product from favorites"
      });
    }
  });
  app2.get("/api/favorites/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId is required"
        });
      }
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          const { data: favRows, error: favErr } = await client.from("user_favorites").select("product_id").eq("user_id", String(userId));
          if (!favErr) {
            const ids = (favRows || []).map((r) => Number(r.product_id)).filter((n) => Number.isFinite(n));
            if (ids.length === 0) {
              return res.json({ success: true, favorites: [] });
            }
            const { data: prods, error: prodErr } = await client.from("products").select("id,slug,name,description,brand_id,category_id").in("id", ids);
            if (!prodErr) {
              const favorites = (prods || []).map((p) => ({
                id: p.id,
                slug: p.slug,
                name: p.name,
                description: p.description
              }));
              return res.json({ success: true, favorites });
            }
          }
        } catch {
        }
      }
      try {
        const favorites = await storage.getUserFavorites(parseInt(String(userId)));
        return res.json({ success: true, favorites });
      } catch {
        const sess = req.session;
        const favIds = Array.isArray(sess?.favorites) ? sess.favorites : [];
        if (favIds.length === 0) {
          return res.json({ success: true, favorites: [] });
        }
        const rows = await db.select({
          id: products.id,
          name: products.name,
          slug: products.slug,
          description: products.description,
          longDescription: products.longDescription,
          brandName: brands.name,
          categoryName: productCategories.name,
          categorySlug: productCategories.slug,
          isNew: products.isNew,
          hasSpecialOffer: products.hasSpecialOffer,
          minPriceCents: sql2`COALESCE(MIN(${productSizes.price}), 0)`.as("min_price_cents")
        }).from(products).leftJoin(brands, eq2(products.brandId, brands.id)).leftJoin(productCategories, eq2(products.categoryId, productCategories.id)).leftJoin(productSizes, eq2(products.id, productSizes.productId)).where(inArray(products.id, favIds)).groupBy(products.id, brands.name, productCategories.name, productCategories.slug);
        const favorites = rows.map((r) => ({ ...r, basePrice: r.minPriceCents ? r.minPriceCents / 100 : null }));
        return res.json({ success: true, favorites });
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch favorites"
      });
    }
  });
  app2.get("/api/favorites/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "userId and productId are required"
        });
      }
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          const { data, error } = await client.from("user_favorites").select("id").eq("user_id", String(userId)).eq("product_id", Number(productId)).maybeSingle();
          if (!error) {
            return res.json({ success: true, isFavorite: !!data });
          }
        } catch {
        }
      }
      try {
        const numericProductId = parseInt(String(productId));
        const numericUserId = parseInt(String(userId));
        const isFavorite = await storage.isProductFavorite(numericUserId, numericProductId);
        return res.json({ success: true, isFavorite });
      } catch {
        const sess = req.session;
        const favs = Array.isArray(sess?.favorites) ? sess.favorites : [];
        const isFavorite = favs.includes(Number(productId));
        return res.json({ success: true, isFavorite });
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check favorite status"
      });
    }
  });
  app2.delete("/api/favorites/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId is required"
        });
      }
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        try {
          const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          const { error } = await client.from("user_favorites").delete().eq("user_id", String(userId));
          if (!error) {
            return res.json({ success: true, message: "All favorites cleared successfully" });
          }
        } catch {
        }
      }
      try {
        await storage.clearUserFavorites(parseInt(String(userId)));
        return res.json({ success: true, message: "All favorites cleared successfully" });
      } catch {
        req.session.favorites = [];
        return res.json({ success: true, message: "All favorites cleared successfully" });
      }
    } catch (error) {
      console.error("Error clearing favorites:", error);
      res.status(500).json({
        success: false,
        message: "Failed to clear favorites"
      });
    }
  });
  app2.get("/api/addresses", async (req, res) => {
    try {
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        });
        const { data: me } = await client.auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        let { data, error } = await client.from("user_addresses").select("id,street,city,cap,province,country,is_default,first_name,last_name").eq("user_id", String(userId));
        if (error) {
          const fallback = await client.from("user_addresses").select("id,street,city,cap,province,country,is_default").eq("user_id", String(userId));
          data = fallback.data;
          error = fallback.error;
          if (error) return res.status(400).json({ success: false, error });
        }
        const normalized = (data || []).map((row) => ({
          id: row.id,
          firstName: row.first_name ?? void 0,
          lastName: row.last_name ?? void 0,
          address: row.street,
          city: row.city,
          postalCode: row.cap ?? row.postal_code,
          province: row.province,
          country: row.country,
          isDefault: !!row.is_default,
          type: "home"
        }));
        return res.json(normalized);
      }
      const sess = req.session;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const addresses = Array.isArray(sess.addresses) ? sess.addresses : [];
      return res.json(addresses);
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.post("/api/addresses", async (req, res) => {
    try {
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      const { firstName, lastName, address, city, postalCode, province, country, isDefault } = req.body || {};
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        });
        const { data: me } = await client.auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        const { count: addrCount } = await client.from("user_addresses").select("id", { count: "exact", head: true }).eq("user_id", String(userId));
        const willBeDefault = (addrCount ?? 0) === 0 ? true : !!isDefault;
        let { data, error } = await client.from("user_addresses").insert({
          user_id: String(userId),
          street: address,
          city,
          cap: postalCode,
          province,
          country,
          is_default: willBeDefault,
          first_name: firstName,
          last_name: lastName
        }).select("*").maybeSingle();
        if (error) {
          const retry = await client.from("user_addresses").insert({
            user_id: String(userId),
            street: address,
            city,
            cap: postalCode,
            province,
            country,
            is_default: willBeDefault
          }).select("*").maybeSingle();
          data = retry.data;
          error = retry.error;
          if (error) return res.status(400).json({ success: false, error });
        }
        if (willBeDefault && data?.id) {
          await client.from("user_addresses").update({ is_default: false }).eq("user_id", String(userId)).neq("id", data.id);
        }
        const normalized = data ? {
          id: data.id,
          firstName,
          lastName,
          address: data.street,
          city: data.city,
          postalCode: data.cap ?? data.postal_code,
          province: data.province,
          country: data.country,
          isDefault: !!data.is_default,
          type: "home"
        } : null;
        return res.status(201).json({ success: true, address: normalized });
      }
      const sess = req.session;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list = Array.isArray(sess.addresses) ? sess.addresses : [];
      const id = Date.now();
      const newAddr = { id, firstName, lastName, address, city, postalCode, province, country, isDefault: !!isDefault };
      let next = [...list, newAddr];
      const hasDefault = next.some((a) => a.isDefault);
      if (!hasDefault) {
        next = next.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
      } else if (newAddr.isDefault) {
        next = next.map((a) => ({ ...a, isDefault: a.id === id }));
      }
      req.session.addresses = next;
      return res.status(201).json({ success: true, address: newAddr });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.put("/api/addresses/:id/default", async (req, res) => {
    try {
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      const addrId = Number(req.params.id);
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        });
        const { data: me } = await client.auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        await client.from("user_addresses").update({ is_default: false }).eq("user_id", String(userId));
        const { error } = await client.from("user_addresses").update({ is_default: true }).eq("id", addrId).eq("user_id", String(userId));
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      }
      const sess = req.session;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list = Array.isArray(sess.addresses) ? sess.addresses : [];
      const next = list.map((a) => ({ ...a, isDefault: Number(a.id) === addrId }));
      req.session.addresses = next;
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.delete("/api/addresses/:id", async (req, res) => {
    try {
      const authHdr = req.headers["authorization"] || req.headers["Authorization"];
      const token = typeof authHdr === "string" && authHdr.startsWith("Bearer ") ? authHdr.slice(7) : void 0;
      const addrId = Number(req.params.id);
      if (token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const client = createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
          global: { headers: { Authorization: `Bearer ${token}` } }
        });
        const { data: me } = await client.auth.getUser();
        const userId = me?.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "Non autenticato" });
        const { error } = await client.from("user_addresses").delete().eq("id", addrId).eq("user_id", String(userId));
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      }
      const sess = req.session;
      if (!sess?.user?.authenticated) return res.status(401).json({ success: false, message: "Non autenticato" });
      const list = Array.isArray(sess.addresses) ? sess.addresses : [];
      const next = list.filter((a) => Number(a.id) !== addrId);
      req.session.addresses = next;
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/orders", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      console.log(`[ORDERS] headers: Authorization=${!!(req.headers["authorization"] || req.headers["Authorization"])}, cookie=${!!req.headers["cookie"]}, sessionAuth=${!!user?.authenticated}`);
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const orders = Array.isArray(sess.orders) ? sess.orders : [];
      return res.json({ orders });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.put("/api/product/:id/slug", async (req, res) => {
    try {
      const { id } = req.params;
      const { newSlug } = req.body;
      if (!id || !newSlug) {
        return res.status(400).json({
          success: false,
          message: "Product ID and newSlug are required"
        });
      }
      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        return res.status(400).json({
          success: false,
          message: "Product ID must be a valid number"
        });
      }
      if (typeof newSlug !== "string" || newSlug.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "newSlug must be a valid non-empty string"
        });
      }
      const cleanSlug = newSlug.trim().toLowerCase().replace(/[^a-z0-9\-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      if (cleanSlug === "") {
        return res.status(400).json({
          success: false,
          message: "newSlug contains only invalid characters"
        });
      }
      const result = await storage.updateProductSlug(numericId, cleanSlug);
      res.json({
        success: true,
        message: "Product slug updated successfully and redirect created",
        oldSlug: result.oldSlug,
        newSlug: result.newSlug
      });
    } catch (error) {
      console.error("Error updating product slug:", error);
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
  app2.post("/api/price-watcher/start", async (req, res) => {
    try {
      const { spreadsheetId, intervalMinutes = 2 } = req.body;
      if (!spreadsheetId) {
        return res.status(400).json({
          success: false,
          message: "spreadsheetId is required"
        });
      }
      const { PriceWatcher: PriceWatcher2 } = await Promise.resolve().then(() => (init_priceWatcher(), priceWatcher_exports));
      if (global.priceWatcher) {
        global.priceWatcher.stop();
      }
      global.priceWatcher = new PriceWatcher2(spreadsheetId);
      global.priceWatcher.start(intervalMinutes);
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
  app2.post("/api/price-watcher/stop", async (req, res) => {
    try {
      if (global.priceWatcher) {
        global.priceWatcher.stop();
        global.priceWatcher = null;
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
  app2.get("/api/price-watcher/status", async (req, res) => {
    try {
      const isActive = global.priceWatcher ? global.priceWatcher.isActive() : false;
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
  app2.post("/api/price-watcher/debug-sheets", async (req, res) => {
    try {
      const { spreadsheetId, sheetName = "Prezzi Prodotti" } = req.body;
      if (!spreadsheetId) {
        return res.status(400).json({
          success: false,
          message: "spreadsheetId is required"
        });
      }
      const { PriceWatcher: PriceWatcher2 } = await Promise.resolve().then(() => (init_priceWatcher(), priceWatcher_exports));
      const watcher = new PriceWatcher2(spreadsheetId, sheetName);
      const auth = await watcher.authenticate();
      const { google } = await import("googleapis");
      const sheets = google.sheets({ version: "v4", auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${sheetName}'!A:G`
      });
      const rows = response.data.values;
      res.json({
        success: true,
        data: {
          totalRows: rows ? rows.length : 0,
          headers: rows ? rows[0] : null,
          firstFewRows: rows ? rows.slice(1, 6) : [],
          lastModified: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("Error debugging Google Sheets:", error);
      res.status(500).json({
        success: false,
        message: "Failed to debug Google Sheets",
        error: error.message || String(error)
      });
    }
  });
  app2.post("/api/price-watcher/sync-to-sheets", async (req, res) => {
    try {
      const { spreadsheetId, sheetName = "Prezzi Prodotti" } = req.body;
      if (!spreadsheetId) {
        return res.status(400).json({
          success: false,
          message: "spreadsheetId is required"
        });
      }
      const { PriceWatcher: PriceWatcher2 } = await Promise.resolve().then(() => (init_priceWatcher(), priceWatcher_exports));
      const watcher = new PriceWatcher2(spreadsheetId, sheetName);
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
        error: error.message || String(error)
      });
    }
  });
  const VALID_CREDENTIALS = [
    { username: "biggimmy", password: "XNCahKl09P!298Gq20LkAns!1" },
    { username: "andrea", password: "So347291Pa21Jka\xF2!ksi=p0!" }
  ];
  async function buildCartItem(productId, variant, quantity, price) {
    const [product] = await db.select().from(products).where(eq2(products.id, productId)).limit(1);
    if (!product) {
      throw new Error("Product not found");
    }
    const [primaryImg] = await db.select().from(productImages).where(and2(eq2(productImages.productId, product.id), eq2(productImages.isPrimary, true))).limit(1);
    const imageUrl = primaryImg?.src ? primaryImg.src.startsWith("/images/") || primaryImg.src.startsWith("/attached_assets/") ? primaryImg.src : `/images/products/${primaryImg.src}` : void 0;
    return {
      id: productId.toString(),
      name: product.name,
      price,
      variant,
      quantity,
      image: imageUrl
    };
  }
  app2.get("/api/cart/:userId", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { userId } = req.params;
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.rpc("get_cart", { p_user_id: userId });
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
  app2.get("/api/cart", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      if (supabaseAdmin && user?.id) {
        const { data, error } = await supabaseAdmin.rpc("get_cart", { p_user_id: String(user.id) });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true, items: data });
      }
      const items = sess.cart || [];
      return res.json({ success: true, items });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      console.log("DEBUG /api/cart POST body:", req.body);
      const { product_option_id, quantity, productId, variant, price } = req.body || {};
      if (supabaseAdmin) {
        const poid = Number(product_option_id);
        const qty = Number(quantity);
        if (Number.isFinite(poid) && poid > 0 && Number.isFinite(qty) && qty > 0) {
          const { error } = await supabaseAdmin.rpc("add_to_cart", {
            p_product_option_id: poid,
            p_quantity: qty,
            p_user_id: String(user.id)
          });
          if (error) return res.status(400).json({ success: false, error });
          return res.json({ success: true });
        }
        const pid = Number(productId);
        const vstr = typeof variant === "string" ? variant : "";
        if (Number.isFinite(pid) && pid > 0 && vstr.length > 0 && Number.isFinite(qty) && qty > 0) {
          try {
            const { data, error } = await supabaseAdmin.from("product_options").select("id, flavor, size, product_id").eq("product_id", pid);
            if (error) return res.status(400).json({ success: false, error });
            const match = Array.isArray(data) ? data.find((o) => {
              const disp = `${(o.flavor ?? "").toString()} ${(o.size ?? "").toString()}`.replace(/Unico/gi, "").trim();
              return disp === vstr.replace(/Unico/gi, "").trim();
            }) : null;
            const resolvedId = match ? Number(match.id) : NaN;
            if (!Number.isFinite(resolvedId) || resolvedId <= 0) {
              return res.status(400).json({ success: false, message: "Parametri non validi" });
            }
            const { error: err2 } = await supabaseAdmin.rpc("add_to_cart", {
              p_product_option_id: resolvedId,
              p_quantity: qty,
              p_user_id: String(user.id)
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
          const rpcRes = await supabaseAnon.rpc("add_to_cart", {
            p_product_option_id: poid,
            p_quantity: qty,
            p_user_id: String(user.id)
          });
          if (!rpcRes.error) return res.json({ success: true });
          const { error: upErr } = await supabaseAnon.from("cart_items").upsert({ user_id: String(user.id), product_option_id: poid, quantity: qty }, { onConflict: "user_id,product_option_id" });
          if (!upErr) return res.json({ success: true });
        }
      }
      const poidSess = Number(product_option_id);
      const qtySess = Number(quantity);
      let current = Array.isArray(sess.cart) ? [...sess.cart] : [];
      if (Number.isFinite(poidSess) && poidSess > 0 && Number.isFinite(qtySess) && qtySess > 0) {
        const idxByOption = current.findIndex((i) => Number(i.product_option_id) === poidSess);
        if (idxByOption >= 0) {
          current[idxByOption] = { ...current[idxByOption], quantity: qtySess };
          sess.cart = current;
          return res.json({ success: true, items: current });
        }
        if (supabaseAnon) {
          const { data } = await supabaseAnon.from("product_options").select("id, flavor, size, product_id, price_cents, image").eq("id", poidSess).limit(1).maybeSingle();
          if (data && data.product_id) {
            let nameVal = "";
            try {
              const { data: prod } = await supabaseAnon.from("products").select("name").eq("id", data.product_id).limit(1).maybeSingle();
              if (prod && prod.name) nameVal = String(prod.name);
            } catch {
            }
            const variantStr = `${(data.flavor ?? "").toString()} ${(data.size ?? "").toString()}`.replace(/Unico/gi, "").trim();
            const priceVal = typeof data.price_cents === "number" ? data.price_cents / 100 : 0;
            const imageUrl = data.image ?? "";
            const newItem2 = {
              id: String(data.product_id),
              name: nameVal,
              price: priceVal,
              variant: variantStr,
              quantity: qtySess,
              image: imageUrl,
              product_option_id: poidSess
            };
            current.push(newItem2);
            sess.cart = current;
            return res.json({ success: true, items: current });
          }
        }
      }
      if (!productId || !variant || !quantity || typeof price !== "number") {
        return res.status(400).json({ success: false, message: "Parametri non validi" });
      }
      const newItem = await buildCartItem(parseInt(productId), String(variant), parseInt(quantity), price);
      const idx = current.findIndex((i) => i.id === newItem.id && i.variant === newItem.variant);
      if (idx >= 0) {
        current[idx] = { ...current[idx], quantity: current[idx].quantity + newItem.quantity };
      } else {
        current.push({ ...newItem, product_option_id: Number.isFinite(poidSess) && poidSess > 0 ? poidSess : void 0 });
      }
      sess.cart = current;
      return res.json({ success: true, items: current });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.put("/api/cart", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      console.log("DEBUG /api/cart PUT body:", req.body);
      const { product_option_id, quantity, productId, variant } = req.body || {};
      if (typeof product_option_id === "number" && typeof quantity === "number") {
        if (!supabaseAdmin) {
          let current2 = Array.isArray(sess.cart) ? [...sess.cart] : [];
          const poidNum = Number(product_option_id);
          let idxByOption = current2.findIndex((i) => Number(i.product_option_id) === poidNum);
          if (idxByOption < 0) {
            idxByOption = current2.findIndex((i) => String(i.id) === String(product_option_id));
          }
          if (idxByOption >= 0) {
            if (quantity <= 0) {
              current2 = current2.filter((_, i) => i !== idxByOption);
            } else {
              const updated = { ...current2[idxByOption], quantity: Number(quantity), product_option_id: poidNum };
              current2[idxByOption] = updated;
            }
            sess.cart = current2;
            return res.status(200).json({ success: true, items: current2 });
          }
        } else {
          const { error } = await supabaseAdmin.rpc("update_cart_quantity", {
            p_product_option_id: product_option_id,
            p_quantity: quantity,
            p_user_id: String(user.id)
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
      let current = Array.isArray(sess.cart) ? [...sess.cart] : [];
      const idx = current.findIndex((i) => {
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
  app2.delete("/api/cart", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { product_option_id, productId, variant } = req.body || {};
      if (supabaseAdmin && typeof product_option_id === "number" && product_option_id > 0) {
        const { error } = await supabaseAdmin.rpc("remove_from_cart", {
          p_product_option_id: product_option_id,
          p_user_id: String(user.id)
        });
        if (error) {
          console.error("Errore remove cart_items su Supabase", error);
          return res.status(500).json({ success: false, message: "Errore rimozione carrello (DB)" });
        }
        return res.json({ success: true });
      }
      if (!supabaseAdmin && supabaseAnon && typeof product_option_id === "number" && product_option_id > 0) {
        const { error } = await supabaseAnon.from("cart_items").delete().eq("user_id", String(user.id)).eq("product_option_id", Number(product_option_id));
        if (!error) return res.json({ success: true });
      }
      let current = Array.isArray(sess.cart) ? [...sess.cart] : [];
      if (typeof product_option_id === "number" && product_option_id > 0) {
        const next2 = current.filter((i) => Number(i.product_option_id) !== Number(product_option_id));
        sess.cart = next2;
        return res.json({ success: true, items: next2 });
      }
      if (!productId) {
        return res.status(400).json({ success: false, message: "Parametri non validi" });
      }
      const next = current.filter((i) => {
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
  app2.delete("/api/cart/:userId", async (req, res) => {
    try {
      const sess = req.session;
      const auth = await getAuthFromToken(req);
      const user = auth ? { authenticated: true, id: auth.id } : sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      const { userId } = req.params;
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin.rpc("clear_cart", { p_user_id: userId });
        if (error) return res.status(400).json({ success: false, error });
        return res.json({ success: true });
      }
      sess.cart = [];
      return res.json({ success: true, items: [] });
    } catch {
      return res.status(500).json({ success: false, message: "Errore interno del server" });
    }
  });
  app2.get("/api/cart-db/:userId", async (req, res) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { userId } = req.params;
      const { data, error } = await supabaseAdmin.rpc("get_cart", { p_user_id: userId });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true, items: data });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore caricamento carrello" });
    }
  });
  app2.post("/api/cart-db", async (req, res) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { product_option_id, quantity } = req.body || {};
      if (!product_option_id || !quantity) {
        return res.status(400).json({ success: false, message: "Parametri non validi" });
      }
      const sess = req.session;
      const userId = sess?.user?.id;
      const { error } = await supabaseAdmin.rpc("add_to_cart", {
        p_product_option_id: product_option_id,
        p_quantity: quantity,
        ...userId ? { p_user_id: userId } : {}
      });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore aggiunta carrello" });
    }
  });
  app2.put("/api/cart-db", async (req, res) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { product_option_id, quantity } = req.body || {};
      if (!product_option_id || typeof quantity !== "number") {
        return res.status(400).json({ success: false, message: "Parametri non validi" });
      }
      const sess = req.session;
      const userId = sess?.user?.id;
      const { error } = await supabaseAdmin.rpc("update_cart_quantity", {
        p_product_option_id: product_option_id,
        p_quantity: quantity,
        ...userId ? { p_user_id: userId } : {}
      });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore aggiornamento carrello" });
    }
  });
  app2.delete("/api/cart-db", async (req, res) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { product_option_id } = req.body || {};
      if (!product_option_id) {
        return res.status(400).json({ success: false, message: "Parametri non validi" });
      }
      const sess = req.session;
      const userId = sess?.user?.id;
      const { error } = await supabaseAdmin.rpc("remove_from_cart", {
        p_product_option_id: product_option_id,
        ...userId ? { p_user_id: userId } : {}
      });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore rimozione carrello" });
    }
  });
  app2.delete("/api/cart-db/:userId", async (req, res) => {
    try {
      if (!supabaseAdmin) {
        return res.status(500).json({ success: false, message: "Supabase non configurato" });
      }
      const { userId } = req.params;
      const { error } = await supabaseAdmin.rpc("clear_cart", { p_user_id: userId });
      if (error) return res.status(400).json({ success: false, error });
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore svuotamento carrello" });
    }
  });
  app2.post("/api/checkout", async (req, res) => {
    try {
      const sess = req.session;
      const user = sess?.user;
      if (!user?.authenticated) {
        return res.status(401).json({ success: false, message: "Non autenticato" });
      }
      let items = [];
      if (supabaseAdmin && user?.id) {
        const { data, error } = await supabaseAdmin.rpc("get_cart", { p_user_id: String(user.id) });
        if (error) return res.status(400).json({ success: false, error });
        items = Array.isArray(data) ? data : [];
      } else {
        items = Array.isArray(sess.cart) ? sess.cart : [];
      }
      if (!items.length) {
        return res.status(400).json({ success: false, message: "Carrello vuoto" });
      }
      const secret = process.env.STRIPE_SECRET_KEY;
      const successUrl = process.env.CHECKOUT_SUCCESS_URL || "http://localhost:8080/success";
      const cancelUrl = process.env.CHECKOUT_CANCEL_URL || "http://localhost:8080/cancel";
      if (!secret) {
        console.error("Checkout error: STRIPE_SECRET_KEY mancante");
        return res.status(500).json({ success: false, message: "Stripe non configurato" });
      }
      console.log("Checkout env check:", { hasSecret: !!secret, successUrl, cancelUrl });
      const stripe = new Stripe(secret);
      const line_items = items.map((i) => {
        const priceCents = typeof i.price_cents === "number" ? i.price_cents : Math.round(Number(i.price) * 100);
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${String(i.name ?? "")} \u2014 ${String(i.variant ?? "")}`.trim(),
              images: i.image ? [i.image] : []
            },
            unit_amount: priceCents
          },
          quantity: Number(i.quantity)
        };
      });
      const sessionStripe = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items,
        success_url: successUrl,
        cancel_url: cancelUrl
      });
      return res.json({ success: true, url: sessionStripe.url });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Errore creazione checkout" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import path2 from "path";
import { fileURLToPath } from "url";
import express from "express";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
function log(message) {
  console.log(`[vite] ${message}`);
}
async function setupVite(app2, server) {
  const vite = await (await import("vite")).createServer({
    server: { middlewareMode: true }
  });
  app2.use(vite.middlewares);
  return vite;
}

// server/index.ts
import { createClient } from "@supabase/supabase-js";
import compression from "compression";
import cors from "cors";
var app = express2();
app.set("trust proxy", 1);
app.use(compression());
app.use("/sw.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile(path3.resolve(process.cwd(), "client/dist", "sw.js"));
});
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
var PORT = parseInt(process.env.PORT || "8080", 10);
var allowedHosts = [
  process.env.ORIGIN || "",
  process.env.APP_URL || "",
  `http://localhost:${PORT}`,
  `http://127.0.0.1:${PORT}`
].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    try {
      const ok = allowedHosts.some((h) => origin.startsWith(h)) || /^http:\/\/localhost(:\d+)?$/i.test(origin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/i.test(origin);
      cb(null, ok);
    } catch {
      cb(null, false);
    }
  },
  credentials: true
}));
var supabaseUrl = process.env.SUPABASE_URL || "";
var supabaseKey = process.env.SUPABASE_ANON_KEY || "";
var supabase = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("\u2705 Supabase client inizializzato");
  } catch (error) {
    console.error("\u274C Errore inizializzazione Supabase:", error);
  }
} else {
  console.warn("\u26A0\uFE0F ATTENZIONE: SUPABASE_URL e/o SUPABASE_ANON_KEY non configurate!");
  console.warn("   L'applicazione continuer\xE0 senza database Supabase.");
}
app.use("/attached_assets", express2.static(path3.resolve(process.cwd(), "attached_assets")));
app.use("/images", express2.static(path3.resolve(process.cwd(), "public/images")));
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.get("/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime(),
      database: supabase ? "configured" : "not configured"
    });
  });
  app.get("/api/test-db", async (req, res) => {
    try {
      if (!supabase) {
        return res.status(500).json({
          success: false,
          error: "Supabase non configurato",
          hint: "Configura SUPABASE_URL e SUPABASE_ANON_KEY su Render"
        });
      }
      const { data, error } = await supabase.from("products").select("id").limit(1);
      if (error) throw error;
      res.json({
        success: true,
        message: "\u2705 Database Supabase connesso!",
        supabaseUrl
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        hint: "Verifica che SUPABASE_URL e SUPABASE_ANON_KEY siano configurate correttamente"
      });
    }
  });
  app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("\u274C Error:", {
      status,
      message,
      path: req.path,
      method: req.method
    });
    res.status(status).json({
      success: false,
      message,
      path: req.path
    });
  });
  app.use("/images", express2.static("public/images"));
  app.get("/api/auth/check", (req, res) => {
    const session2 = req.session;
    const user = session2?.user;
    if (user && user.authenticated && user.username === "biggimmy") {
      res.json({
        success: true,
        authenticated: true,
        user: { username: user.username, loginTime: user.loginTime }
      });
    } else {
      res.json({
        success: true,
        authenticated: false
      });
    }
  });
  app.use("/api", (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "API route not found",
      path: req.originalUrl
    });
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const distPath = path3.resolve(process.cwd(), "client/dist");
    const assetsPath = path3.join(distPath, "assets");
    app.use(express2.static(distPath));
    app.use("/assets", express2.static(assetsPath));
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({
          success: false,
          message: "API route not found"
        });
      }
      res.sendFile(path3.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", async () => {
    console.log("=================================");
    console.log(`\u2705 Server avviato`);
    console.log(`\u{1F550} ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`);
    console.log(`\u{1F30D} Porta: ${PORT}`);
    console.log(`\u{1F527} Environment: ${app.get("env")}`);
    console.log(`\u{1F5C4}\uFE0F  Database: ${supabase ? "\u2705 Supabase configurato" : "\u26A0\uFE0F Non configurato"}`);
    console.log("=================================");
    console.log(`\u{1F4CD} Endpoints disponibili:`);
    console.log(`   GET  /health - Health check`);
    console.log(`   GET  /api/test-db - Test database`);
    console.log(`   GET  /images/* - Static images`);
    console.log(`   GET  /attached_assets/* - Static assets`);
    console.log("=================================");
  });
})();
export {
  supabase
};
