import { IOrder, IShippingMethod } from '../interfaces/order';
import { calculateTotalPrice } from './Cart.utils';

export const getDefaultShippingMethod = (
	shippingMethods: IShippingMethod[] | undefined,
) => {
	const defaultShippingMethod = shippingMethods?.find(
		(method) => method.attributes.isDefault === true,
	);
	return defaultShippingMethod;
};

/**
 * Calculates cost by adding cartItems price and ShippingMethodOption price
 * @param order
 * @returns {number} The total price of cartItems + shipping
 */
export const getOrderTotal = (order: IOrder) => {
	if (order.attributes.cart.data.attributes.cart_items) {
		const cartTotalPrice = calculateTotalPrice(
			order.attributes.cart.data.attributes.cart_items?.data,
		);
		const orderShippingCost =
			order.attributes.shipping_method_option.data.attributes.price;
		return +cartTotalPrice + +orderShippingCost;
	}
	return 0;
};
