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
		product.attributes.categories_level_3 &&
		product.attributes.categories_level_3.data?.length >= 0
	) {
		product.attributes.categories_level_3.data.map(
			(category: any, index: number) => {
				product.attributes.categories_level_3 &&
					productCategories.push(
						index !== product.attributes.categories_level_3.data.length - 1
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
 * Iterates to all objects with price property and returns array of sorted prices
 * @param product
 * @returns sorted prices number[]
 */
export const getProductPriceRange = (product?: IProduct) => {
	const priceArray: number[] = [];

	if (product) {
		if (product.attributes && product.attributes.price) {
			priceArray.push(product.attributes.price);
		}
		if (product.attributes.product_colors?.data) {
			product.attributes.product_colors.data.forEach((color) => {
				if (color.attributes.price && color.attributes.price > 0) {
					priceArray.push(color.attributes.price);
				}
			});
		}
		if (product.attributes.product_sizes?.data) {
			product.attributes.product_sizes.data.forEach((size) => {
				if (size.attributes.price && size.attributes.price > 0) {
					priceArray.push(size.attributes.price);
				}
			});
		}
	}

	return priceArray.sort(function (a, b) {
		return a - b;
	});
};

/**
 * Calls getProductPriceRange and returns a formatted string
 * @param product
 * @returns
 */
export const printPriceRanges = (product: IProduct) => {
	let priceRangesString = '';
	if (product) {
		const priceRanges = getProductPriceRange(product);
		// if the lowest price is equal to the highest, show just one
		if (priceRanges[0] === priceRanges[priceRanges.length - 1]) {
			priceRangesString = `€${priceRanges[0].toFixed(2)}`;
		}
		// else show the price ranges, with lowest to highest
		else {
			priceRangesString = `€${priceRanges[0].toFixed(2)} - €${priceRanges[
				priceRanges.length - 1
			].toFixed(2)}`;
		}
	}
	return priceRangesString;
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
 * Push all media urls(Product/color/size) to a string[]
 * @param product
 * @returns {string[]}
 */
export const getProductMediaUrls = (product: IProduct) => {
	const mediaUrls = [];
	if (product) {
		if (
			product.attributes.mediaUrls &&
			product.attributes.mediaUrls.length > 0
		) {
			mediaUrls.push(...product.attributes.mediaUrls);
		}
		if (
			product.attributes.product_colors?.data &&
			product.attributes.product_colors?.data.length > 0
		) {
			product.attributes.product_colors.data.forEach((color) => {
				if (color.attributes.mediaUrls) {
					mediaUrls.push(...color.attributes.mediaUrls);
				}
			});
		}
		if (
			product.attributes.product_sizes?.data &&
			product.attributes.product_sizes?.data.length > 0
		) {
			product.attributes.product_sizes.data.forEach((size) => {
				if (size.attributes.mediaUrls) {
					mediaUrls.push(...size.attributes.mediaUrls);
				}
			});
		}
	}
	return mediaUrls;
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
