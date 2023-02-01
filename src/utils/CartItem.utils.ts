import { ICartItemResponse } from '../interfaces/cart';

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
