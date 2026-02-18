import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  requestType: text("request_type").default("informazioni"),
  orderId: text("order_id"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  requestType: true,
  orderId: true,
  message: true,
});

// Negozi
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 100 }),
  hours: text("hours").notNull(),
  mapLink: text("map_link"),
  isNew: boolean("is_new").default(false),
});

export const insertStoreSchema = createInsertSchema(stores).pick({
  name: true,
  address: true,
  phone: true,
  email: true,
  hours: true,
  mapLink: true,
  isNew: true,
});

// Brands di prodotti
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  website: text("website"),
  logo: text("logo"),
});

export const insertBrandSchema = createInsertSchema(brands).pick({
  name: true,
  slug: true,
  description: true,
  website: true,
  logo: true,
});

// Categorie di prodotti
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  image: text("image"),
});

export const insertProductCategorySchema = createInsertSchema(productCategories).pick({
  name: true,
  slug: true,
  description: true,
  image: true,
});

// Prodotti base (senza varianti)
export const productGroups = pgTable("product_groups", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  features: json("features").$type<string[]>(),
  howToUse: text("how_to_use"),
  warnings: text("warnings"),
  specialOfferText: text("special_offer_text"),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  hasSpecialOffer: boolean("has_special_offer").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Varianti specifiche di ogni prodotto
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  groupId: integer("group_id").references(() => productGroups.id),
  brandId: integer("brand_id").notNull().references(() => brands.id),
  categoryId: integer("category_id").notNull().references(() => productCategories.id),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  features: json("features").$type<string[]>(),
  howToUse: text("how_to_use"),
  warnings: text("warnings"),
  specialOfferText: text("special_offer_text"),
  flavor: varchar("flavor", { length: 100 }),
  size: varchar("size", { length: 50 }),
  quantity: varchar("quantity", { length: 50 }),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  hasSpecialOffer: boolean("has_special_offer").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductGroupSchema = createInsertSchema(productGroups).pick({
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
  hasSpecialOffer: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
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
  hasSpecialOffer: true,
});

// Immagini dei prodotti
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  isPrimary: boolean("is_primary").default(false),
});

export const insertProductImageSchema = createInsertSchema(productImages).pick({
  productId: true,
  src: true,
  alt: true,
  isPrimary: true,
});

// Taglie/Formati dei prodotti
export const productSizes = pgTable("product_sizes", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  value: varchar("value", { length: 50 }).notNull(),
  unit: varchar("unit", { length: 20 }).notNull(),
  price: integer("price").notNull(), // Prezzo in centesimi
});

export const insertProductSizeSchema = createInsertSchema(productSizes).pick({
  productId: true,
  value: true,
  unit: true,
  price: true,
});

// Disponibilità nei negozi
export const productAvailability = pgTable("product_availability", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  storeId: integer("store_id").notNull().references(() => stores.id),
  isAvailable: boolean("is_available").default(true),
  stockQuantity: integer("stock_quantity"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductAvailabilitySchema = createInsertSchema(productAvailability).pick({
  productId: true,
  storeId: true,
  isAvailable: true,
  stockQuantity: true,
});

// Tabella Preferiti - per gestire i prodotti salvati dagli utenti
export const userFavorites = pgTable("user_favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  productId: integer("product_id").notNull().references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserFavoriteSchema = createInsertSchema(userFavorites).pick({
  userId: true,
  productId: true,
});

// Relazioni
export const productGroupsRelations = relations(productGroups, ({ one, many }) => ({
  brand: one(brands, {
    fields: [productGroups.brandId],
    references: [brands.id],
  }),
  category: one(productCategories, {
    fields: [productGroups.categoryId],
    references: [productCategories.id],
  }),
  variants: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  group: one(productGroups, {
    fields: [products.groupId],
    references: [productGroups.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
  images: many(productImages),
  sizes: many(productSizes),
  availability: many(productAvailability),
  options: many(productOptions),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productSizesRelations = relations(productSizes, ({ one }) => ({
  product: one(products, {
    fields: [productSizes.productId],
    references: [products.id],
  }),
}));

export const productAvailabilityRelations = relations(productAvailability, ({ one }) => ({
  product: one(products, {
    fields: [productAvailability.productId],
    references: [products.id],
  }),
  store: one(stores, {
    fields: [productAvailability.storeId],
    references: [stores.id],
  }),
}));

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [userFavorites.productId],
    references: [products.id],
  }),
}));

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;

export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;

export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

export type InsertProductGroup = z.infer<typeof insertProductGroupSchema>;
export type ProductGroup = typeof productGroups.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertProductImage = z.infer<typeof insertProductImageSchema>;
export type ProductImage = typeof productImages.$inferSelect;

export type InsertProductSize = z.infer<typeof insertProductSizeSchema>;
export type ProductSize = typeof productSizes.$inferSelect;

export type InsertProductAvailability = z.infer<typeof insertProductAvailabilitySchema>;
export type ProductAvailability = typeof productAvailability.$inferSelect;

// Opzioni prodotto (varianti) con prezzi
export const productOptions = pgTable("product_options", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  flavor: text("flavor"),
  size: text("size"),
  priceCents: integer("price_cents").notNull(), // Prezzo in centesimi
  originalPriceCents: integer("original_price_cents"),
  image: text("image"),
  inStock: boolean("in_stock").default(true),
});

export const insertProductOptionSchema = createInsertSchema(productOptions).omit({
  id: true,
});

export type InsertUserFavorite = z.infer<typeof insertUserFavoriteSchema>;
export type UserFavorite = typeof userFavorites.$inferSelect;

export const productOptionsRelations = relations(productOptions, ({ one }) => ({
  product: one(products, {
    fields: [productOptions.productId],
    references: [products.id],
  }),
}));

export type InsertProductOption = z.infer<typeof insertProductOptionSchema>;
export type ProductOption = typeof productOptions.$inferSelect;

// Tabella per gestire i redirect degli slug quando vengono aggiornati
export const productSlugRedirects = pgTable("product_slug_redirects", {
  id: serial("id").primaryKey(),
  oldSlug: varchar("old_slug", { length: 200 }).notNull(),
  newSlug: varchar("new_slug", { length: 200 }).notNull(),
  productId: integer("product_id").notNull().references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSlugRedirectSchema = createInsertSchema(productSlugRedirects).omit({
  id: true,
  createdAt: true,
});

export type InsertProductSlugRedirect = z.infer<typeof insertProductSlugRedirectSchema>;
export type ProductSlugRedirect = typeof productSlugRedirects.$inferSelect;
