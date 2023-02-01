import { IUserFlat } from '../interfaces/account';
import {
	IProduct,
	IProductColor,
	IProductFlat,
	IProductSize,
} from '../interfaces/product';
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
 * @param addUser User function to update React Context
 * @param makeFavorite If this is ADDING a favorite or REMOVING a favorite from user
 */
export const addProductToFavorites = async (
	product: IProduct,
	updatedUser: IUserFlat,
	addUser: (user: IUserFlat) => void,
	makeFavorite = true,
) => {
	if (product && product.id && updatedUser) {
		let newFavoriteProducts;
		// if this is ADDING a favorite
		if (makeFavorite) {
			if (updatedUser.favorite_products) {
				newFavoriteProducts = [
					...updatedUser.favorite_products,
					transformProductToProductFlat(product),
				];
			} else {
				newFavoriteProducts = [transformProductToProductFlat(product)];
			}
		}
		// if this is REMOVING a favorite
		else {
			if (updatedUser.favorite_products) {
				// find the product in favorites
				const findFavoriteProductIndex =
					updatedUser.favorite_products.findIndex(
						(favoriteProduct) => favoriteProduct.id === product.id,
					);
				newFavoriteProducts = [...updatedUser.favorite_products];
				// and remove it
				newFavoriteProducts.splice(
					findFavoriteProductIndex,
					findFavoriteProductIndex + 1,
				);
			}
		}
		const newUser: IUserFlat = {
			...updatedUser,
			favorite_products: newFavoriteProducts,
		};
		// update user and refresh user object with relations
		await updateUser(newUser).then(async () => {
			await getUser(`${newUser.id}`).then((userResponse: any) => {
				addUser(userResponse.data);
				return userResponse.data;
			});
		});
	}
};

/**
 * Calculates what price to show, based on 3 inputs
 * @param selectedProductSize
 * @param selectedProductColor
 * @param product
 * @returns
 */
export const calculateProductPrice = (
	returnString = true,
	selectedProductSize?: IProductSize | undefined,
	selectedProductColor?: IProductColor | undefined,
	product?: IProduct | undefined,
) => {
	let price = 0;
	if (selectedProductColor && selectedProductSize) {
		if (
			selectedProductColor.attributes.price >=
			selectedProductSize.attributes.price
		) {
			price = selectedProductColor.attributes.price;
		} else {
			price = selectedProductSize.attributes.price;
		}
	} else if (selectedProductColor) {
		price = selectedProductColor.attributes.price;
	} else if (selectedProductSize) {
		price = selectedProductSize.attributes.price;
	} else if (product) {
		price = product.attributes.price;
	}
	return returnString ? `€${price.toFixed(2)}` : price;
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
