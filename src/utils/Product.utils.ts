import { CartItemResponse } from '../interfaces/product';

/**
 * Iterates through the cart actions and calculates the total discount of the cart
 * @param cartItems
 * @returns
 */
export const calculateTotalDiscount = (cartItems: CartItemResponse[]): string => {
	let totalDiscount = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((cartItem) => {
			if (
				cartItem.attributes.product_discount &&
				cartItem.attributes.product_discount?.data &&
				cartItem.attributes.product_discount?.data.length > 0
			) {
				cartItem.attributes.product_discount?.data.forEach((discount) => {
					totalDiscount += discount.attributes.discountPercentage;
				});
			}
		});
	}
	return totalDiscount.toFixed(2);
};
