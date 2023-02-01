import { ICartItemResponse } from '../interfaces/cart';
import { calculateProductPrice } from './Product.utils';

export const getCartItemProduct = (cartItem: ICartItemResponse | undefined) => {
	if (cartItem) {
		if (cartItem.attributes.product?.data) {
			return cartItem.attributes.product?.data;
		} else if (
			cartItem.attributes.product_color?.data &&
			cartItem.attributes.product_color?.data.attributes.product?.data
		) {
			return cartItem.attributes.product_color?.data.attributes.product?.data;
		} else if (
			cartItem.attributes.product_size?.data &&
			cartItem.attributes.product_size?.data.attributes.product?.data
		) {
			return cartItem.attributes.product_size?.data.attributes.product?.data;
		}
		return undefined;
	} else {
		return undefined;
	}
};

/**
 * Iterate through the cartItem and define where to get the product mediaUrls
 * @param cartItem
 * @returns
 */
export const getCartItemMedia = (cartItem: ICartItemResponse | undefined) => {
	if (cartItem) {
		if (
			cartItem.attributes.product?.data &&
			cartItem.attributes.product?.data.attributes.mediaUrls
		) {
			return cartItem.attributes.product?.data.attributes.mediaUrls;
		} else if (
			cartItem.attributes.product_color?.data &&
			cartItem.attributes.product_color?.data.attributes.product?.data
				.attributes.mediaUrls
		) {
			return cartItem.attributes.product_color?.data.attributes.product?.data
				.attributes.mediaUrls;
		} else if (
			cartItem.attributes.product_size?.data &&
			cartItem.attributes.product_size?.data.attributes.product?.data.attributes
				.mediaUrls
		) {
			return cartItem.attributes.product_size?.data.attributes.product?.data
				.attributes.mediaUrls;
		}
		return [''];
	} else {
		return [''];
	}
};

/**
 * Iterate through the cartItem and define where to get the product mediaUrls
 * @param cartItem
 * @returns
 */
export const getCartItemOptions = (cartItem: ICartItemResponse | undefined) => {
	let productOptions = '';
	if (cartItem) {
		if (cartItem.attributes.product?.data) {
			productOptions += '';
		}
		if (cartItem.attributes.product_color?.data) {
			productOptions += `Color: ${cartItem.attributes.product_color?.data.attributes.name}`;
		}
		if (cartItem.attributes.product_size?.data) {
			productOptions += productOptions !== '' ? '\n' : '';
			productOptions += `Size: ${cartItem.attributes.product_color?.data.attributes.name}`;
		}
	} else {
		productOptions += '';
	}
	return productOptions;
};

/**
 * Iterate through the cartItem and define where to get the product mediaUrls
 * @param cartItem
 * @returns
 */
export const getCartItemPrice = (
	cartItem: ICartItemResponse | undefined,
	returnString = true,
) => {
	if (cartItem) {
		return calculateProductPrice(
			returnString,
			cartItem.attributes.product_size?.data,
			cartItem.attributes.product_color?.data,
			cartItem.attributes.product?.data,
		);
	} else {
		return '0';
	}
};
