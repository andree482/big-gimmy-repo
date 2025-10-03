import { relations } from "drizzle-orm/relations";
import { products, productImages, productSizes, productAvailability, stores, brands, productGroups, productCategories, users, userFavorites } from "./schema";

export const productImagesRelations = relations(productImages, ({one}) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productImages: many(productImages),
	productSizes: many(productSizes),
	productAvailabilities: many(productAvailability),
	productGroup: one(productGroups, {
		fields: [products.groupId],
		references: [productGroups.id]
	}),
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id]
	}),
	productCategory: one(productCategories, {
		fields: [products.categoryId],
		references: [productCategories.id]
	}),
	userFavorites: many(userFavorites),
}));

export const productSizesRelations = relations(productSizes, ({one}) => ({
	product: one(products, {
		fields: [productSizes.productId],
		references: [products.id]
	}),
}));

export const productAvailabilityRelations = relations(productAvailability, ({one}) => ({
	product: one(products, {
		fields: [productAvailability.productId],
		references: [products.id]
	}),
	store: one(stores, {
		fields: [productAvailability.storeId],
		references: [stores.id]
	}),
}));

export const storesRelations = relations(stores, ({many}) => ({
	productAvailabilities: many(productAvailability),
}));

export const productGroupsRelations = relations(productGroups, ({one, many}) => ({
	brand: one(brands, {
		fields: [productGroups.brandId],
		references: [brands.id]
	}),
	productCategory: one(productCategories, {
		fields: [productGroups.categoryId],
		references: [productCategories.id]
	}),
	products: many(products),
}));

export const brandsRelations = relations(brands, ({many}) => ({
	productGroups: many(productGroups),
	products: many(products),
}));

export const productCategoriesRelations = relations(productCategories, ({many}) => ({
	productGroups: many(productGroups),
	products: many(products),
}));

export const userFavoritesRelations = relations(userFavorites, ({one}) => ({
	user: one(users, {
		fields: [userFavorites.userId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [userFavorites.productId],
		references: [products.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userFavorites: many(userFavorites),
}));