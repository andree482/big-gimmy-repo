import { pgTable, unique, serial, text, varchar, timestamp, foreignKey, integer, boolean, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);

export const productCategories = pgTable("product_categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	slug: varchar({ length: 100 }).notNull(),
	description: text(),
	image: text(),
}, (table) => [
	unique("product_categories_name_unique").on(table.name),
	unique("product_categories_slug_unique").on(table.slug),
]);

export const contacts = pgTable("contacts", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const brands = pgTable("brands", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	slug: varchar({ length: 100 }).notNull(),
	description: text(),
	logo: text(),
	website: text(),
}, (table) => [
	unique("brands_name_unique").on(table.name),
	unique("brands_slug_unique").on(table.slug),
]);

export const productImages = pgTable("product_images", {
	id: serial().primaryKey().notNull(),
	productId: integer("product_id").notNull(),
	src: text().notNull(),
	alt: text().notNull(),
	isPrimary: boolean("is_primary").default(false),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_images_product_id_products_id_fk"
		}),
]);

export const productSizes = pgTable("product_sizes", {
	id: serial().primaryKey().notNull(),
	productId: integer("product_id").notNull(),
	value: varchar({ length: 50 }).notNull(),
	unit: varchar({ length: 20 }).notNull(),
	price: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_sizes_product_id_products_id_fk"
		}),
]);

export const productAvailability = pgTable("product_availability", {
	id: serial().primaryKey().notNull(),
	productId: integer("product_id").notNull(),
	storeId: integer("store_id").notNull(),
	isAvailable: boolean("is_available").default(true),
	stockQuantity: integer("stock_quantity"),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_availability_product_id_products_id_fk"
		}),
	foreignKey({
			columns: [table.storeId],
			foreignColumns: [stores.id],
			name: "product_availability_store_id_stores_id_fk"
		}),
]);

export const productGroups = pgTable("product_groups", {
	id: serial().primaryKey().notNull(),
	slug: varchar({ length: 200 }).notNull(),
	name: varchar({ length: 200 }).notNull(),
	brandId: integer("brand_id").notNull(),
	categoryId: integer("category_id").notNull(),
	description: text().notNull(),
	longDescription: text("long_description"),
	features: json(),
	howToUse: text("how_to_use"),
	warnings: text(),
	specialOfferText: text("special_offer_text"),
	isNew: boolean("is_new").default(false),
	isBestSeller: boolean("is_best_seller").default(false),
	hasSpecialOffer: boolean("has_special_offer").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.brandId],
			foreignColumns: [brands.id],
			name: "product_groups_brand_id_brands_id_fk"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [productCategories.id],
			name: "product_groups_category_id_product_categories_id_fk"
		}),
	unique("product_groups_slug_unique").on(table.slug),
]);

export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	slug: varchar({ length: 200 }).notNull(),
	name: varchar({ length: 200 }).notNull(),
	brandId: integer("brand_id").notNull(),
	categoryId: integer("category_id").notNull(),
	description: text().notNull(),
	longDescription: text("long_description"),
	features: json(),
	howToUse: text("how_to_use"),
	warnings: text(),
	specialOfferText: text("special_offer_text"),
	isNew: boolean("is_new").default(false),
	isBestSeller: boolean("is_best_seller").default(false),
	hasSpecialOffer: boolean("has_special_offer").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	groupId: integer("group_id"),
	flavor: varchar({ length: 100 }),
	size: varchar({ length: 50 }),
	quantity: varchar({ length: 50 }),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [productGroups.id],
			name: "products_group_id_product_groups_id_fk"
		}),
	foreignKey({
			columns: [table.brandId],
			foreignColumns: [brands.id],
			name: "products_brand_id_brands_id_fk"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [productCategories.id],
			name: "products_category_id_product_categories_id_fk"
		}),
	unique("products_slug_unique").on(table.slug),
]);

export const stores = pgTable("stores", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	address: text().notNull(),
	phone: varchar({ length: 20 }).notNull(),
	email: varchar({ length: 100 }),
	hours: text().notNull(),
	mapLink: text("map_link"),
	isNew: boolean("is_new").default(false),
});

export const userFavorites = pgTable("user_favorites", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	productId: integer("product_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_favorites_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "user_favorites_product_id_products_id_fk"
		}),
]);
