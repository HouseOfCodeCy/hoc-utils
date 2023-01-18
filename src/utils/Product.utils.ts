import { IUserFlat } from '../interfaces/account';
import { IProduct, IProductFlat } from '../interfaces/product';
import { getUser, updateUser } from '../services/User.service';

/**
 * Handler for quantity event handler
 * @param quantity Quantity for Add to Cart
 * @param increment If is increment or decrement
 * @returns
 */
export const quantityHandle = (quantity: number, increment: boolean) => {
	let tmpQuantity = quantity;
	if (increment && quantity < 9) {
		tmpQuantity++;
	} else if (!increment && quantity > 1) {
		tmpQuantity--;
	}
	return tmpQuantity;
};

/**
 * Returns the categories of a product in a string[]
 * @param product
 * @returns
 */
export const calculateProductCategories = (product: IProduct) => {
	const productCategories: string[] = [];
	if (
		product &&
		product.attributes.product_sub_categories &&
		product.attributes.product_sub_categories.data.length >= 0
	) {
		product.attributes.product_sub_categories.data.map(
			(category: any, index: number) => {
				product.attributes.product_sub_categories &&
					productCategories.push(
						index !== product.attributes.product_sub_categories.data.length - 1
							? `${category.attributes.name}, `
							: category.attributes.name,
					);
			},
		);
	}
	return productCategories;
};

export const calculatePriceWithQuantity = (
	price: number,
	quantity?: number,
): number => {
	if (quantity) {
		return +(price * quantity).toFixed(2);
	}
	return +price.toFixed(2);
};

/**
 * Return the acronym of the product brand
 * @param product
 * @returns
 */
export const getBrandAcronym = (product: IProduct) => {
	let brandAcronym = '';
	if (
		product &&
		product.attributes.product_brand &&
		product.attributes.product_brand.data
	) {
		brandAcronym = product.attributes.product_brand?.data?.attributes.name
			.split(/\s/)
			.reduce((response, word) => (response += word.slice(0, 1)), '');
	}
	return brandAcronym;
};

/**
 * Receives product and display appropriate label based on the number of stock count
 * @param product The product to check stock
 * @param lowAvailabilityThreshold A threshold for emphasizing low in stock
 * @param highAvailabilityThreshold A threshold for emphasizing high in stock
 * @returns
 */
export const calculateStockAvailability = (
	product: IProduct,
	lowAvailabilityThreshold = 3,
	highAvailabilityThreshold = 5,
) => {
	let availability = '';
	if (product) {
		const stockAvailability = product.attributes.stock
			? product.attributes.stock
			: 99;
		if (stockAvailability === 0) {
			availability = 'Out of Stock';
		} else if (stockAvailability >= highAvailabilityThreshold) {
			availability = 'In Stock';
		} else if (stockAvailability >= lowAvailabilityThreshold) {
			availability = 'Low in Stock';
		}
		return availability;
	} else {
		return 'In Stock';
	}
};

/**
 * Check if given product is marked as favorite by the user
 * @param favoriteProducts All user favorite products
 * @param product The given product
 * @returns {boolean} True/False if it marked as favorite
 */
export const isProductFavorite = (
	favoriteProducts: IProductFlat[],
	product: IProduct,
): boolean => {
	if (favoriteProducts && favoriteProducts?.length > 0) {
		const productExistsInFavorites = favoriteProducts.find(
			(favoriteProduct) => favoriteProduct.id === product.id,
		);
		return productExistsInFavorites ? true : false;
	}
	return false;
};

/**
 * Adds a product to the favorites
 * @param product Product to be added in Favorites
 * @param updatedUser The user
 */
export const addProductToFavorites = async (
	product: IProduct,
	updatedUser: IUserFlat,
) => {
	if (product && product.id && updatedUser) {
		let newFavoriteProducts;
		if (updatedUser.favorite_products) {
			newFavoriteProducts = [
				...updatedUser.favorite_products,
				transformProductToProductFlat(product),
			];
		} else {
			newFavoriteProducts = [transformProductToProductFlat(product)];
		}
		const newUser: IUserFlat = {
			...updatedUser,
			favorite_products: newFavoriteProducts,
		};
		await updateUser(newUser).then(async () => {
			await getUser(`${newUser.id}`).then((userResponse: any) => {
				return userResponse.data;
			});
		});
	}
};

/**
 * Transforms
 * @param {IProduct} product Product to transform
 * @returns {IProductFlat} Product in IProductFlat interface
 */
export const transformProductToProductFlat = (
	product: IProduct,
): IProductFlat => {
	return { ...product.attributes, id: product.id };
};
