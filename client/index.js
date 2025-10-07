var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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
  insertProductSchema: () => insertProductSchema,
  insertProductSizeSchema: () => insertProductSizeSchema,
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
  productSizes: () => productSizes,
  productSizesRelations: () => productSizesRelations,
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
var users, insertUserSchema, contacts, insertContactSchema, stores, insertStoreSchema, brands, insertBrandSchema, productCategories, insertProductCategorySchema, productGroups, products, insertProductGroupSchema, insertProductSchema, productImages, insertProductImageSchema, productSizes, insertProductSizeSchema, productAvailability, insertProductAvailabilitySchema, userFavorites, insertUserFavoriteSchema, productGroupsRelations, productsRelations, productImagesRelations, productSizesRelations, productAvailabilityRelations, userFavoritesRelations;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true
    });
    contacts = pgTable("contacts", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      email: text("email").notNull(),
      phone: text("phone"),
      message: text("message").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertContactSchema = createInsertSchema(contacts).pick({
      name: true,
      email: true,
      phone: true,
      message: true
    });
    stores = pgTable("stores", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      address: text("address").notNull(),
      phone: varchar("phone", { length: 20 }).notNull(),
      email: varchar("email", { length: 100 }),
      hours: text("hours").notNull(),
      mapLink: text("map_link"),
      isNew: boolean("is_new").default(false)
    });
    insertStoreSchema = createInsertSchema(stores).pick({
      name: true,
      address: true,
      phone: true,
      email: true,
      hours: true,
      mapLink: true,
      isNew: true
    });
    brands = pgTable("brands", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 100 }).notNull().unique(),
      slug: varchar("slug", { length: 100 }).notNull().unique(),
      description: text("description"),
      website: text("website"),
      logo: text("logo")
    });
    insertBrandSchema = createInsertSchema(brands).pick({
      name: true,
      slug: true,
      description: true,
      website: true,
      logo: true
    });
    productCategories = pgTable("product_categories", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 100 }).notNull().unique(),
      slug: varchar("slug", { length: 100 }).notNull().unique(),
      description: text("description"),
      image: text("image")
    });
    insertProductCategorySchema = createInsertSchema(productCategories).pick({
      name: true,
      slug: true,
      description: true,
      image: true
    });
    productGroups = pgTable("product_groups", {
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
    products = pgTable("products", {
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
    insertProductGroupSchema = createInsertSchema(productGroups).pick({
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
    insertProductSchema = createInsertSchema(products).pick({
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
    productImages = pgTable("product_images", {
      id: serial("id").primaryKey(),
      productId: integer("product_id").notNull().references(() => products.id),
      src: text("src").notNull(),
      alt: text("alt").notNull(),
      isPrimary: boolean("is_primary").default(false)
    });
    insertProductImageSchema = createInsertSchema(productImages).pick({
      productId: true,
      src: true,
      alt: true,
      isPrimary: true
    });
    productSizes = pgTable("product_sizes", {
      id: serial("id").primaryKey(),
      productId: integer("product_id").notNull().references(() => products.id),
      value: varchar("value", { length: 50 }).notNull(),
      unit: varchar("unit", { length: 20 }).notNull(),
      price: integer("price").notNull()
      // Prezzo in centesimi
    });
    insertProductSizeSchema = createInsertSchema(productSizes).pick({
      productId: true,
      value: true,
      unit: true,
      price: true
    });
    productAvailability = pgTable("product_availability", {
      id: serial("id").primaryKey(),
      productId: integer("product_id").notNull().references(() => products.id),
      storeId: integer("store_id").notNull().references(() => stores.id),
      isAvailable: boolean("is_available").default(true),
      stockQuantity: integer("stock_quantity"),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    insertProductAvailabilitySchema = createInsertSchema(productAvailability).pick({
      productId: true,
      storeId: true,
      isAvailable: true,
      stockQuantity: true
    });
    userFavorites = pgTable("user_favorites", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      productId: integer("product_id").notNull().references(() => products.id),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertUserFavoriteSchema = createInsertSchema(userFavorites).pick({
      userId: true,
      productId: true
    });
    productGroupsRelations = relations(productGroups, ({ one, many }) => ({
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
    productsRelations = relations(products, ({ one, many }) => ({
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
      availability: many(productAvailability)
    }));
    productImagesRelations = relations(productImages, ({ one }) => ({
      product: one(products, {
        fields: [productImages.productId],
        references: [products.id]
      })
    }));
    productSizesRelations = relations(productSizes, ({ one }) => ({
      product: one(products, {
        fields: [productSizes.productId],
        references: [products.id]
      })
    }));
    productAvailabilityRelations = relations(productAvailability, ({ one }) => ({
      product: one(products, {
        fields: [productAvailability.productId],
        references: [products.id]
      }),
      store: one(stores, {
        fields: [productAvailability.storeId],
        references: [stores.id]
      })
    }));
    userFavoritesRelations = relations(userFavorites, ({ one }) => ({
      user: one(users, {
        fields: [userFavorites.userId],
        references: [users.id]
      }),
      product: one(products, {
        fields: [userFavorites.productId],
        references: [products.id]
      })
    }));
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema: schema_exports });
  }
});

// server/priceWatcher.ts
var priceWatcher_exports = {};
__export(priceWatcher_exports, {
  PriceWatcher: () => PriceWatcher
});
import { google } from "googleapis";
import { eq as eq2 } from "drizzle-orm";
import * as fs2 from "fs";
var PriceWatcher;
var init_priceWatcher = __esm({
  "server/priceWatcher.ts"() {
    "use strict";
    init_db();
    init_schema();
    PriceWatcher = class {
      spreadsheetId;
      sheetName;
      intervalId = null;
      lastCheckTime = 0;
      isRunning = false;
      constructor(spreadsheetId, sheetName = "Prezzi Prodotti") {
        this.spreadsheetId = spreadsheetId;
        this.sheetName = sheetName;
      }
      async authenticate() {
        try {
          const credentials = JSON.parse(fs2.readFileSync("google-credentials.json", "utf8"));
          const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
          });
          return auth;
        } catch (error) {
          console.error("\u274C Errore nell'autenticazione Google:", error);
          throw error;
        }
      }
      async checkForPriceChanges() {
        console.log(`\u{1F50D} Controllo modifiche prezzi... (${(/* @__PURE__ */ new Date()).toLocaleTimeString()})`);
        try {
          const auth = await this.authenticate();
          const sheets = google.sheets({ version: "v4", auth });
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: `'${this.sheetName}'!A:F`
          });
          const rows = response.data.values;
          if (!rows || rows.length <= 1) {
            console.log("\u274C Nessun dato trovato nel Google Sheets");
            return [];
          }
          console.log(`\u{1F4CB} Struttura foglio - Header:`, rows[0]);
          console.log(`\u{1F4CB} Trovate ${rows.length - 1} righe di dati`);
          const changes = [];
          for (let i = 1; i < Math.min(4, rows.length); i++) {
            console.log(`\u{1F50D} Riga ${i + 1} completa:`, rows[i]);
          }
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            try {
              const productId = parseInt(row[0]);
              const productName = row[1]?.toString();
              const size = row[2]?.toString();
              const unit = row[3]?.toString();
              const currentPrice = parseFloat(row[4]);
              const newPrice = parseFloat(row[5]);
              if (i <= 3) {
                console.log(`\u{1F4CA} Debug riga ${i + 1}:`);
                console.log(`   - Product ID: ${productId} (tipo: ${typeof productId})`);
                console.log(`   - Product Name: "${productName}"`);
                console.log(`   - Size: "${size}"`);
                console.log(`   - Unit: "${unit}"`);
                console.log(`   - Current Price: ${currentPrice} (tipo: ${typeof currentPrice}, isNaN: ${isNaN(currentPrice)})`);
                console.log(`   - New Price: ${newPrice} (tipo: ${typeof newPrice}, isNaN: ${isNaN(newPrice)})`);
                console.log(`   - Differenza prezzi: ${Math.abs(newPrice - currentPrice)}`);
              }
              if (!productId || !size || isNaN(newPrice) || newPrice <= 0) {
                if (i <= 3) console.log(`\u274C Riga ${i + 1} invalida - saltata`);
                continue;
              }
              if (!isNaN(currentPrice) && Math.abs(newPrice - currentPrice) >= 0.01) {
                console.log(`\u{1F504} Rilevata modifica prezzo riga ${i + 1}: ${currentPrice} \u2192 ${newPrice}`);
                const priceInCents = Math.round(newPrice * 100);
                const existingSizes = await db.select().from(productSizes).where(eq2(productSizes.productId, productId));
                const targetSize = existingSizes.find(
                  (s) => s.value === size && (s.unit === unit || unit === "" && s.unit === "")
                );
                if (targetSize) {
                  console.log(`\u{1F4CA} Trovato nel DB: Prezzo attuale DB = \u20AC${targetSize.price / 100}, Nuovo prezzo = \u20AC${newPrice}`);
                  console.log(`\u2705 Aggiunta modifica: ${productName} - ${size}${unit}`);
                  changes.push({
                    productId,
                    productName,
                    size,
                    unit,
                    oldPrice: targetSize.price / 100,
                    newPrice
                  });
                } else {
                  console.log(`\u274C Non trovato nel DB: Product ID ${productId}, Size: ${size}, Unit: ${unit}`);
                }
              } else {
                if (i <= 3) console.log(`\u23ED\uFE0F Riga ${i + 1}: Prezzi uguali (${currentPrice} = ${newPrice})`);
              }
            } catch (error) {
              console.error(`\u274C Errore elaborando riga ${i + 1}:`, error);
            }
          }
          console.log(`\u{1F4CB} Totale modifiche rilevate: ${changes.length}`);
          return changes;
        } catch (error) {
          console.error("\u274C Errore durante il controllo:", error);
          return [];
        }
      }
      async applyPriceChanges(changes) {
        let updatedCount = 0;
        for (const change of changes) {
          try {
            const priceInCents = Math.round(change.newPrice * 100);
            const existingSizes = await db.select().from(productSizes).where(eq2(productSizes.productId, change.productId));
            const targetSize = existingSizes.find(
              (s) => s.value === change.size && s.unit === change.unit
            );
            if (targetSize) {
              await db.update(productSizes).set({ price: priceInCents }).where(eq2(productSizes.id, targetSize.id));
              console.log(`\u2705 Aggiornato automaticamente: ${change.productName} (ID: ${change.productId}), ${change.size}${change.unit}: \u20AC${change.oldPrice.toFixed(2)} \u2192 \u20AC${change.newPrice.toFixed(2)}`);
              updatedCount++;
            }
          } catch (error) {
            console.error(`\u274C Errore aggiornando ${change.productName}:`, error);
          }
        }
        if (updatedCount > 0) {
          console.log(`\u{1F389} Aggiornati automaticamente ${updatedCount} prezzi!`);
        }
      }
      async updateGoogleSheetsCurrentPrices() {
        try {
          const auth = await this.authenticate();
          const sheets = google.sheets({ version: "v4", auth });
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: `'${this.sheetName}'!A:F`
          });
          const rows = response.data.values;
          if (!rows || rows.length <= 1) return;
          const updates = [];
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const productId = parseInt(row[0]);
            const size = row[2]?.toString();
            const unit = row[3]?.toString();
            const newPrice = parseFloat(row[5]);
            if (!productId || !size || !unit || isNaN(newPrice)) continue;
            updates.push([
              row[0],
              // Product ID
              row[1],
              // Product Name
              row[2],
              // Size
              row[3],
              // Unit
              newPrice.toFixed(2),
              // Current Price (aggiornato)
              newPrice.toFixed(2)
              // New Price
            ]);
          }
          if (updates.length > 0) {
            await sheets.spreadsheets.values.update({
              spreadsheetId: this.spreadsheetId,
              range: `'${this.sheetName}'!A2:F${updates.length + 1}`,
              valueInputOption: "RAW",
              requestBody: {
                values: updates
              }
            });
          }
        } catch (error) {
          console.error("\u274C Errore aggiornando Google Sheets:", error);
        }
      }
      start(intervalMinutes = 2) {
        if (this.isRunning) {
          console.log("\u26A0\uFE0F Price Watcher \xE8 gi\xE0 in esecuzione");
          return;
        }
        const intervalText = intervalMinutes < 1 ? `${intervalMinutes * 60} secondi` : `${intervalMinutes} minuti`;
        console.log(`\u{1F680} Avvio Price Watcher: controllo ogni ${intervalText}`);
        console.log(`\u{1F4CA} Monitoraggio Google Sheets ID: ${this.spreadsheetId}`);
        this.isRunning = true;
        this.performCheck();
        this.intervalId = setInterval(() => {
          this.performCheck();
        }, intervalMinutes * 60 * 1e3);
      }
      stop() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.isRunning = false;
        console.log("\u{1F6D1} Price Watcher fermato");
      }
      async performCheck() {
        try {
          const changes = await this.checkForPriceChanges();
          if (changes.length > 0) {
            console.log(`\u{1F504} Rilevate ${changes.length} modifiche di prezzo`);
            await this.applyPriceChanges(changes);
            await this.updateGoogleSheetsCurrentPrices();
          } else {
            console.log(`\u2713 Nessuna modifica rilevata (${(/* @__PURE__ */ new Date()).toLocaleTimeString()})`);
          }
        } catch (error) {
          console.error("\u274C Errore durante il controllo automatico:", error);
        }
      }
      isActive() {
        return this.isRunning;
      }
    };
  }
});

// server/autoStartPriceWatcher.ts
var autoStartPriceWatcher_exports = {};
__export(autoStartPriceWatcher_exports, {
  startAutomaticPriceWatcher: () => startAutomaticPriceWatcher
});
async function startAutomaticPriceWatcher() {
  if (GOOGLE_SHEETS_ID) {
    try {
      console.log("\u{1F680} Avvio automatico Price Watcher...");
      const watcher = new PriceWatcher(GOOGLE_SHEETS_ID);
      watcher.start(CHECK_INTERVAL_MINUTES);
      global.priceWatcher = watcher;
      const intervalText = CHECK_INTERVAL_MINUTES < 1 ? `${CHECK_INTERVAL_MINUTES * 60} secondi` : `${CHECK_INTERVAL_MINUTES} minuti`;
      console.log(`\u2705 Price Watcher attivo: controlla ogni ${intervalText}`);
      console.log(`\u{1F4CA} Monitoraggio Google Sheets: ${GOOGLE_SHEETS_ID}`);
      process.on("SIGINT", () => {
        console.log("\n\u{1F6D1} Arresto Price Watcher...");
        watcher.stop();
        process.exit(0);
      });
      process.on("SIGTERM", () => {
        console.log("\n\u{1F6D1} Arresto Price Watcher...");
        watcher.stop();
        process.exit(0);
      });
    } catch (error) {
      console.error("\u274C Errore avvio automatico Price Watcher:", error);
    }
  } else {
    console.log("\u26A0\uFE0F GOOGLE_SHEETS_ID non configurato. Price Watcher non avviato automaticamente.");
    console.log("\u{1F4A1} Configura GOOGLE_SHEETS_ID nelle secrets per l'avvio automatico");
  }
}
var GOOGLE_SHEETS_ID, CHECK_INTERVAL_MINUTES, NODE_ENV;
var init_autoStartPriceWatcher = __esm({
  "server/autoStartPriceWatcher.ts"() {
    "use strict";
    init_priceWatcher();
    GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID || "1oH-CXTbWUKkvhdIrwa-8bqw5bzHmCON6Eygx38x7XPc";
    CHECK_INTERVAL_MINUTES = 0.25;
    NODE_ENV = process.env.NODE_ENV || "development";
  }
});

// server/index.ts
import express2 from "express";
import path4 from "path";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();
init_db();
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
             ps_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price) as price
        FROM product_sizes 
        WHERE price > 0
        GROUP BY product_id
      ) ps_min ON p.id = ps_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
      ORDER BY p.name ASC, p.id ASC
    `);
    const groupedProducts = /* @__PURE__ */ new Map();
    const products3 = result.rows;
    console.log(`\u{1F527} Inizio raggruppamento di ${products3.length} prodotti totali`);
    for (const product of products3) {
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
    console.log(`\u{1F4E6} Raggruppamento completato: ${products3.length} \u2192 ${finalProducts.length} prodotti`);
    return finalProducts;
  }
  async searchProducts(searchQuery, filters) {
    let whereClause = `WHERE p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'`;
    const params = [];
    if (filters?.categorySlug) {
      whereClause += ` AND pc.slug = '${filters.categorySlug}'`;
    }
    if (filters?.brandSlug) {
      whereClause += ` AND b.slug = '${filters.brandSlug}'`;
    }
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.trim().replace(/'/g, "''");
      whereClause += ` AND (
        -- Priorit\xE0 massima: nome prodotto che inizia con il termine
        LOWER(p.name) LIKE LOWER('${searchTerm}%') OR
        -- Priorit\xE0 alta: nome prodotto che contiene il termine
        LOWER(p.name) LIKE LOWER('%${searchTerm}%') OR
        -- Priorit\xE0 media: brand che contiene il termine (solo se molto specifico)
        (LENGTH('${searchTerm}') >= 3 AND LOWER(b.name) LIKE LOWER('%${searchTerm}%'))
      )`;
    }
    let orderClause;
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.trim().replace(/'/g, "''");
      orderClause = `ORDER BY 
        CASE 
          WHEN LOWER(p.name) LIKE LOWER('${searchTerm}%') THEN 1
          WHEN LOWER(p.name) LIKE LOWER('%${searchTerm}%') THEN 2
          ELSE 3
        END,
        p.name ASC, p.id ASC`;
    } else {
      orderClause = "ORDER BY p.name ASC, p.id ASC";
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case "price-asc":
            orderClause = "ORDER BY ps_min.price ASC, p.name ASC";
            break;
          case "price-desc":
            orderClause = "ORDER BY ps_min.price DESC, p.name ASC";
            break;
          case "name-desc":
            orderClause = "ORDER BY p.name DESC, p.id ASC";
            break;
        }
      }
    }
    const result = await db.execute(sql.raw(`
      SELECT p.*, b.name as brand_name, b.slug as brand_slug, pc.name as category_name, pc.slug as category_slug,
             ps_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price) as price
        FROM product_sizes 
        WHERE price > 0
        GROUP BY product_id
      ) ps_min ON p.id = ps_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      ${whereClause}
      ${orderClause}
    `));
    const groupedProducts = /* @__PURE__ */ new Map();
    let products3 = result.rows;
    for (const product of products3) {
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
    products3 = Array.from(groupedProducts.values());
    if (filters?.priceRange && filters.priceRange !== "all") {
      products3 = products3.filter((product) => {
        const priceInEuros = (product.min_price_cents || 0) / 100;
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
    console.log(`\u{1F50D} Ricerca completata: ${products3.length} prodotti trovati`);
    return products3;
  }
  async getProductsByCategory(categorySlug) {
    const result = await db.execute(`
      SELECT p.*, b.name as brand_name, pc.name as category_name,
             ps_min.price as min_price_cents,
             pi.src as primaryimage,
             pg.name as product_group_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN (
        SELECT product_id, MIN(price) as price
        FROM product_sizes 
        WHERE price > 0
        GROUP BY product_id
      ) ps_min ON p.id = ps_min.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE pc.slug = '${categorySlug}'
      AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
      ORDER BY p.name ASC, p.id ASC
    `);
    const groupedProducts = /* @__PURE__ */ new Map();
    const products3 = result.rows;
    console.log(`\u{1F527} Inizio raggruppamento di ${products3.length} prodotti per ${categorySlug}`);
    for (const product of products3) {
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
    console.log(`\u{1F4E6} Raggruppamento completato: ${products3.length} \u2192 ${grouped.length} prodotti`);
    return grouped;
  }
  async getProductGroupsByCategory(categorySlug) {
    const result = await db.execute(`
      SELECT gp.*, b.name as brand_name, pc.name as category_name
      FROM grouped_products gp
      JOIN brands b ON gp.brand_id = b.id
      JOIN product_categories pc ON gp.category_id = pc.id
      WHERE pc.slug = '${categorySlug}'
      ORDER BY gp.variant_count DESC, gp.name ASC
    `);
    return result.rows;
  }
  async getProductGroupBySlug(slug) {
    const result = await db.execute(`
      SELECT gp.*, b.name as brand_name, pc.name as category_name
      FROM grouped_products gp
      JOIN brands b ON gp.brand_id = b.id
      JOIN product_categories pc ON gp.category_id = pc.id
      WHERE gp.slug = '${slug}'
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
    const baseProductResult = await db.execute(`
      SELECT p.*, b.name as brand_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = '${baseProductSlug}'
    `);
    if (baseProductResult.rows.length === 0) return [];
    const baseProduct = baseProductResult.rows[0];
    let variantsQuery = "";
    if (baseProduct.group_id) {
      variantsQuery = `
        SELECT DISTINCT
          p.id,
          p.slug as variant_slug,
          p.flavor,
          p.quantity as size,
          ps.price as price_cents,
          p.id as original_product_id,
          COALESCE('/images/products/' || p.slug || '.jpg', '/images/products/default.jpg') as image_path
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        WHERE p.group_id = ${baseProduct.group_id}
        AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
        ORDER BY p.flavor, p.quantity
      `;
    } else {
      const baseName = baseProduct.name.replace(/ (750g|1kg|2kg|500g|300g|400g|350g|250g|150g|80g|60g|100g|200g)/g, "").replace(/ (Chocolate|Vanilla|Strawberry|Natural|Banana|Orange|Lemon|Coffee|Coconut|Cioccolato|Vaniglia|Fragola|Naturale|Caffè|Cocco|Limone|Arancia|Mirtillo|Unico)/g, "").trim();
      variantsQuery = `
        SELECT DISTINCT
          p.id,
          p.slug as variant_slug,
          p.flavor,
          p.quantity as size,
          ps.price as price_cents,
          p.id as original_product_id,
          COALESCE('/images/products/' || p.slug || '.jpg', '/images/products/default.jpg') as image_path
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        WHERE p.brand_id = ${baseProduct.brand_id}
        AND (p.name LIKE '%${baseName}%' OR p.name = '${baseProduct.name}')
        AND p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'
        ORDER BY p.flavor, p.quantity
      `;
    }
    const result = await db.execute(variantsQuery);
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
    console.log(`\u{1F50D} DEBUG: product.primaryimage = "${product.primaryimage}"`);
    const imageUrl = product.primaryimage ? product.primaryimage.startsWith("/images/") || product.primaryimage.startsWith("/attached_assets/") ? product.primaryimage : `/images/products/${product.primaryimage}` : void 0;
    const finalProduct = {
      ...product,
      primaryImage: imageUrl,
      image_url: imageUrl
      // Frontend cerca questo campo
    };
    console.log(`\u{1F50D} DEBUG: finalProduct.primaryImage = "${finalProduct.primaryImage}"`);
    return finalProduct;
  }
  async getProductBySlugWithDetails(slug) {
    const result = await db.execute(`
      SELECT p.*, b.name as brand_name, pc.name as category_name, pc.slug as category_slug,
             ps.id as size_id, ps.value as size_value, ps.unit as size_unit, ps.price as price_cents,
             pi.src as image_url, pi.alt as image_alt,
             pg.name as product_group_name, pg.features as product_group_features,
             p.features as features
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_groups pg ON p.group_id = pg.id
      LEFT JOIN product_sizes ps ON p.id = ps.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.slug = '${slug}'
      ORDER BY ps.price ASC
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
    let whereClause = `WHERE p.description NOT LIKE '%[CONSOLIDATO IN VARIANTE]%'`;
    if (filters?.categorySlug) {
      whereClause += ` AND pc.slug = '${filters.categorySlug}'`;
    }
    if (filters?.searchQuery && filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.trim().replace(/'/g, "''");
      whereClause += ` AND (
        LOWER(p.name) LIKE LOWER('%${searchTerm}%') OR
        LOWER(p.description) LIKE LOWER('%${searchTerm}%') OR
        LOWER(b.name) LIKE LOWER('%${searchTerm}%') OR
        LOWER(pc.name) LIKE LOWER('%${searchTerm}%')
      )`;
    }
    const result = await db.execute(`
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
};
var storage = new DatabaseStorage();

// server/routes.ts
init_schema();
import { z } from "zod";

// server/services/email.ts
import { MailService } from "@sendgrid/mail";
var ADMIN_EMAIL = "info@biggimmyintegratori.com";
var FROM_EMAIL = "noreply@biggimmyintegratori.com";
var SIMULATION_MODE = false;
var mailService = null;
if (!SIMULATION_MODE) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY deve essere impostata nelle variabili d'ambiente");
  }
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}
async function sendAdminNotification(formData) {
  const { name, email, phone, message } = formData;
  if (SIMULATION_MODE) {
    console.log("=== SIMULAZIONE: Email di notifica all'amministratore ===");
    console.log("A:", ADMIN_EMAIL);
    console.log("Da:", FROM_EMAIL);
    console.log("Oggetto:", `Nuovo messaggio dal sito web da ${name}`);
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Telefono:", phone || "Non fornito");
    console.log("Messaggio:", message);
    console.log("=== FINE SIMULAZIONE ===");
    return true;
  }
  try {
    if (!mailService) {
      throw new Error("Servizio email non configurato");
    }
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuovo Contatto - Big Gimmy Integratori</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              \u{1F3CB}\uFE0F Big Gimmy Integratori
            </h1>
            <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
              Nuovo messaggio dal sito web
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px; background-color: #ffffff;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #FFD100; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
              <h2 style="color: #212121; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                \u{1F4E7} Dettagli del Contatto
              </h2>
            </div>
            
            <div style="margin-bottom: 20px;">
              <div style="display: inline-block; background-color: #e3f2fd; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #1976d2; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">\u{1F464} Nome:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">${name}</p>
              </div>
              
              <div style="display: inline-block; background-color: #e8f5e8; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #2e7d32; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">\u{1F4E7} Email:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">
                  <a href="mailto:${email}" style="color: #1976d2; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <div style="display: inline-block; background-color: #fff3e0; padding: 12px 16px; border-radius: 8px; margin-bottom: 15px; width: 100%; box-sizing: border-box;">
                <strong style="color: #f57c00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">\u{1F4F1} Telefono:</strong>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 500;">
                  ${phone ? `<a href="tel:${phone}" style="color: #1976d2; text-decoration: none;">${phone}</a>` : "Non fornito"}
                </p>
              </div>
            </div>
            
            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #9c27b0;">
              <strong style="color: #7b1fa2; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 10px;">\u{1F4AC} Messaggio:</strong>
              <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; line-height: 1.6;">
                <p style="margin: 0; color: #333; font-size: 15px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Risposta alla tua richiesta - Big Gimmy Integratori&body=Ciao ${name},%0D%0A%0D%0AGrazie per averci contattato tramite il nostro sito web.%0D%0A%0D%0AIn riferimento al tuo messaggio:%0D%0A"${message.replace(/"/g, "").replace(/\n/g, "%0D%0A")}"%0D%0A%0D%0A[Scrivi qui la tua risposta]%0D%0A%0D%0ACordiali saluti,%0D%0AIl team di Big Gimmy Integratori%0D%0Ainfo@biggimmyintegratori.com%0D%0A%0D%0A---%0D%0ABig Gimmy Integratori%0D%0ACorso Torino, 85 - 10090 Buttigliera Alta (TO)%0D%0ACorso Saint-Martin-de-Corl\xE9ans, 55 - Aosta (AO)%0D%0Awww.biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3); transition: all 0.3s ease;">
                \u2709\uFE0F Rispondi al Cliente
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 15px;">
              <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
              <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
            </div>
            
            <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                \u{1F4CD} <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                \u{1F4CD} <strong>Filiale:</strong> Corso Saint-Martin-de-Corl\xE9ans, 55 - Aosta (AO)<br>
                \u{1F310} <a href="https://biggimmyintegratori.it" style="color: #FFD100; text-decoration: none;">www.biggimmyintegratori.it</a>
              </p>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
              <p style="margin: 0; color: #888888; font-size: 11px;">
                &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                Questa \xE8 un'email automatica generata dal sito web.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Mobile Responsive -->
        <style>
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content-padding { padding: 20px 15px !important; }
            h1 { font-size: 24px !important; }
            h2 { font-size: 18px !important; }
          }
        </style>
      </body>
      </html>
    `;
    const emailText = `
      NUOVO MESSAGGIO DAL SITO WEB BIG GIMMY
      
      Nome: ${name}
      Email: ${email}
      Telefono: ${phone || "Non fornito"}
      Messaggio: ${message}
    `;
    const recipients = [ADMIN_EMAIL];
    await mailService?.send({
      to: recipients,
      from: FROM_EMAIL,
      subject: `Nuovo messaggio dal sito web da ${name}`,
      text: emailText,
      html: emailHTML,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      }
    });
    console.log("Email all'amministratore inviata con successo ai seguenti destinatari:", recipients);
    return true;
  } catch (error) {
    console.error("Errore nell'invio dell'email all'amministratore:", error);
    if (error instanceof Error) {
      console.error("Dettagli errore:", {
        message: error.message,
        stack: error.stack,
        recipients: [ADMIN_EMAIL],
        fromEmail: FROM_EMAIL
      });
    }
    return false;
  }
}
async function sendPersonalizedReply(recipientEmail, recipientName, subject, replyMessage) {
  if (SIMULATION_MODE) {
    console.log("=== SIMULAZIONE: Email di risposta personalizzata ===");
    console.log("A:", recipientEmail);
    console.log("Da:", ADMIN_EMAIL);
    console.log("Oggetto:", subject);
    console.log("Contenuto:", replyMessage);
    console.log("=== FINE SIMULAZIONE ===");
    return true;
  }
  try {
    if (!mailService) {
      throw new Error("Servizio email non configurato");
    }
    await mailService?.send({
      to: recipientEmail,
      from: ADMIN_EMAIL,
      // Inviamo da info@biggimmyintegratori.com
      subject,
      text: `
        Ciao ${recipientName},

        ${replyMessage}
        
        Cordiali saluti,
        Il team di Big Gimmy Integratori
        info@biggimmyintegratori.com
      `,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      },
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Risposta - Big Gimmy Integratori</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                \u{1F3CB}\uFE0F Big Gimmy Integratori
              </h1>
              <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                Risposta dal nostro team
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px; background-color: #ffffff;">
              <div style="background-color: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
                  \u{1F44B} Ciao ${recipientName}!
                </h2>
                <p style="margin: 0; color: #4caf50; font-size: 14px; font-weight: 500;">
                  Ti rispondiamo personalmente
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; line-height: 1.6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                  <p style="margin: 0; color: #333; font-size: 16px; white-space: pre-wrap;">${replyMessage}</p>
                </div>
                
                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 25px 0;">
                  <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                    \u{1F4DE} Contattaci per ulteriori informazioni:
                  </h3>
                  <div style="color: #555; font-size: 14px; line-height: 1.8;">
                    <p style="margin: 5px 0;"><strong>\u{1F4E7} Email:</strong> <a href="mailto:info@biggimmyintegratori.com" style="color: #1976d2; text-decoration: none;">info@biggimmyintegratori.com</a></p>
                    <p style="margin: 5px 0;"><strong>\u{1F4CD} Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)</p>
                    <p style="margin: 5px 0;"><strong>\u{1F4CD} Filiale:</strong> Corso Saint-Martin-de-Corl\xE9ans, 55 - Aosta (AO)</p>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3);">
                  \u{1F6D2} Visita il nostro Sito
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #666; font-size: 15px; font-weight: 500;">
                  Cordiali saluti,<br>
                  <strong style="color: #FFD100; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Il team di Big Gimmy Integratori</strong> \u{1F4AA}
                </p>
                <p style="margin: 10px 0 0 0; color: #999; font-size: 13px;">
                  <a href="mailto:info@biggimmyintegratori.com" style="color: #FFD100; text-decoration: none; font-weight: 500;">info@biggimmyintegratori.com</a>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 15px;">
                <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
                <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
              </div>
              
              <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                  \u{1F4CD} <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                  \u{1F4CD} <strong>Filiale:</strong> Corso Saint-Martin-de-Corl\xE9ans, 55 - Aosta (AO)<br>
                  \u{1F310} <a href="https://biggimmyintegratori.it" style="color: #FFD100; text-decoration: none;">www.biggimmyintegratori.it</a>
                </p>
              </div>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
                <p style="margin: 0; color: #888888; font-size: 11px;">
                  &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                  Questa email \xE8 stata inviata dal nostro team di supporto.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    console.log("Email di risposta personalizzata inviata con successo a:", recipientEmail);
    return true;
  } catch (error) {
    console.error("Errore nell'invio dell'email di risposta personalizzata:", error);
    return false;
  }
}
async function sendUserConfirmation(formData) {
  const { name, email } = formData;
  if (SIMULATION_MODE) {
    console.log("=== SIMULAZIONE: Email di conferma all'utente ===");
    console.log("A:", email);
    console.log("Da:", FROM_EMAIL);
    console.log("Oggetto:", "Conferma ricezione messaggio - Big Gimmy");
    console.log("Contenuto:", `Ciao ${name}, grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al pi\xF9 presto.`);
    console.log("=== FINE SIMULAZIONE ===");
    return true;
  }
  try {
    if (!mailService) {
      throw new Error("Servizio email non configurato");
    }
    await mailService?.send({
      to: email,
      from: FROM_EMAIL,
      subject: "Conferma ricezione messaggio - Big Gimmy",
      text: `
        Ciao ${name},

        Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al pi\xF9 presto.
        
        Il team di Big Gimmy
      `,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      },
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conferma Ricezione - Big Gimmy Integratori</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #212121; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                \u{1F3CB}\uFE0F Big Gimmy Integratori
              </h1>
              <p style="color: #333; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
                Conferma ricezione messaggio
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 25px; background-color: #ffffff;">
              <div style="background-color: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">
                  \u2705 Messaggio Ricevuto!
                </h2>
                <p style="margin: 0; color: #4caf50; font-size: 14px; font-weight: 500;">
                  Ti risponderemo al pi\xF9 presto
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <p style="margin: 0 0 15px 0; font-size: 18px; color: #333; font-weight: 500;">
                  Ciao <strong style="color: #FFD100; background-color: #333; padding: 2px 8px; border-radius: 4px;">${name}</strong> \u{1F44B}
                </p>
                
                <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                  Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e il nostro team ti risponder\xE0 entro <strong>24 ore</strong>.
                </p>
                
                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 20px 0;">
                  <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                    \u{1F50D} Nel frattempo, puoi:
                  </h3>
                  <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                    <li>Visitare il nostro <a href="https://biggimmyintegratori.it/prodotti" style="color: #1976d2; text-decoration: none; font-weight: 500;">catalogo prodotti</a></li>
                    <li>Scoprire i nostri <a href="https://biggimmyintegratori.it/negozi" style="color: #1976d2; text-decoration: none; font-weight: 500;">punti vendita</a></li>
                    <li>Seguirci sui social per offerte esclusive</li>
                  </ul>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://biggimmyintegratori.it" style="display: inline-block; background: linear-gradient(135deg, #FFD100 0%, #FFC700 100%); color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 209, 0, 0.3);">
                  \u{1F6D2} Visita il nostro Sito
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #666; font-size: 15px; font-weight: 500;">
                  Cordiali saluti,<br>
                  <strong style="color: #FFD100; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Il team di Big Gimmy Integratori</strong> \u{1F4AA}
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #212121; color: #ffffff; padding: 25px 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 15px;">
                <h3 style="margin: 0; color: #FFD100; font-size: 18px; font-weight: bold;">Big Gimmy Integratori</h3>
                <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">P.IVA 09256080012</p>
              </div>
              
              <div style="border-top: 1px solid #444; padding-top: 15px; margin-top: 15px;">
                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                  \u{1F4CD} <strong>Sede Principale:</strong> Corso Torino, 85 - 10090 Buttigliera Alta (TO)<br>
                  \u{1F4CD} <strong>Filiale:</strong> Corso Saint-Martin-de-Corl\xE9ans, 55 - Aosta (AO)<br>
                  \u{1F4E7} <a href="mailto:info@biggimmyintegratori.com" style="color: #FFD100; text-decoration: none;">info@biggimmyintegratori.com</a>
                </p>
              </div>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #444;">
                <p style="margin: 0; color: #888888; font-size: 11px;">
                  &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Big Gimmy Integratori. Tutti i diritti riservati.<br>
                  Questa \xE8 un'email automatica, si prega di non rispondere direttamente.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });
    return true;
  } catch (error) {
    console.error("Errore nell'invio dell'email di conferma all'utente:", error);
    return false;
  }
}

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
async function registerRoutes(app2) {
  app2.post("/api/send-reply", async (req, res) => {
    try {
      const { recipientEmail, recipientName, subject, message } = req.body;
      if (!recipientEmail || !recipientName || !subject || !message) {
        return res.status(400).json({
          error: "Tutti i campi sono obbligatori (recipientEmail, recipientName, subject, message)"
        });
      }
      const emailSent = await sendPersonalizedReply(recipientEmail, recipientName, subject, message);
      res.json({
        success: true,
        message: "Email di risposta personalizzata inviata con successo",
        emailSent
      });
    } catch (error) {
      console.error("Errore nell'invio dell'email personalizzata:", error);
      res.status(500).json({
        error: "Errore interno del server durante l'invio dell'email personalizzata"
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      const adminEmailSent = await sendAdminNotification({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message
      });
      const userEmailSent = await sendUserConfirmation({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message
      });
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
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      return res.status(500).json({
        success: false,
        message: "Server error, please try again later"
      });
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
      res.set({
        "Cache-Control": "public, max-age=600, stale-while-revalidate=300, immutable",
        "ETag": `all-products-${search || "no-search"}-${brand || "no-brand"}-${priceRange || "no-range"}-${sortBy || "default"}`
      });
      let products3;
      if (search || brand || priceRange || sortBy) {
        products3 = await storage.searchProducts(
          search,
          {
            brandSlug: brand,
            priceRange,
            sortBy
          }
        );
      } else {
        products3 = await storage.getAllProducts();
      }
      res.json(products3);
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
      res.set({
        "Cache-Control": "public, max-age=600, stale-while-revalidate=300, immutable",
        "ETag": `products-${category}-${search || "no-search"}-${brand || "no-brand"}-${priceRange || "no-range"}-${sortBy || "default"}`
      });
      let products3;
      if (search || brand || priceRange || sortBy) {
        products3 = await storage.searchProducts(
          search,
          {
            categorySlug: category,
            brandSlug: brand,
            priceRange,
            sortBy
          }
        );
      } else {
        products3 = await storage.getProductsByCategory(category);
      }
      res.json(products3);
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
      const product = await storage.getProductBySlug(slug);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      res.json(product);
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
      const product = await storage.getProductBySlugWithDetails(slug);
      if (!product) {
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
      await sendEmail(name, email, message);
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
  app2.delete("/api/favorites", async (req, res) => {
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
  app2.get("/api/favorites/:userId", async (req, res) => {
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
  app2.get("/api/favorites/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "userId and productId are required"
        });
      }
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
  app2.delete("/api/favorites/:userId", async (req, res) => {
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
      const { google: google2 } = await import("googleapis");
      const sheets = google2.sheets({ version: "v4", auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${sheetName}'!A:F`
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
        error: error.message
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs3 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist", "public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs3.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "..", "dist");
  if (!fs3.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
init_priceWatcher();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static(path4.resolve(process.cwd(), "attached_assets")));
app.use("/images", express2.static(path4.resolve(process.cwd(), "public/images")));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
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
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  app.use("/images", express2.static("public/images"));
  let priceWatcher = null;
  const GOOGLE_SHEETS_ID2 = process.env.GOOGLE_SHEETS_ID;
  if (GOOGLE_SHEETS_ID2 && process.env.NODE_ENV === "production") {
    priceWatcher = new PriceWatcher(GOOGLE_SHEETS_ID2);
    priceWatcher.start(0.25);
  }
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  const PORT = 5e3;
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`${(/* @__PURE__ */ new Date()).toLocaleTimeString()} [express] serving on port ${PORT}`);
    try {
      const { startAutomaticPriceWatcher: startAutomaticPriceWatcher2 } = await Promise.resolve().then(() => (init_autoStartPriceWatcher(), autoStartPriceWatcher_exports));
      await startAutomaticPriceWatcher2();
    } catch (error) {
      console.log("\u2139\uFE0F Price Watcher non avviato automaticamente:", error.message);
    }
  });
})();
