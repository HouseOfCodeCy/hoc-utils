import { ICartItemResponse } from '../interfaces/cart';
import { CartStatus, ProductInventoryActions } from '../resources/enums';
import { updateCart } from '../services/Cart.service';
import { createOrder } from '../services/Order.service';
import { updateProductInventory } from '../services/ProductInventory.service';

/**
 * Receives a string for Cart Total and Trasform to number without the dot.
 * @param {string} totalCartAmount The Cart Total Amount
 * @returns {number} Returns 0 if param is empty
 */
export const transformPriceToStripeAmount = (
	totalCartAmount: string,
): number => {
	if (totalCartAmount !== '') {
		return +totalCartAmount.replace('.', '');
	}
	return 0;
};

/**
 * Checkouts a cart and updates all product inventory with correct ACTION = PURCHASED_BY_CUSTOMER
 * @param orderPayload
 */
export const checkoutCartAndUpdateProductInventory = async (
	orderPayload: any,
) => {
	const newOrderPayload = {
		cart: orderPayload.cart.id,
		address: orderPayload.address ? orderPayload.address.id : null,
		order_payment_method: orderPayload.order_payment_method.id,
		shipping_method_option: orderPayload.shipping_method_option.id,
		order_status: orderPayload.order_status.id,
	};
	const orderResponse: any = await createOrder(newOrderPayload);
	const cartId = orderPayload.cart.id;
	const cartItems = orderPayload.cart.attributes.cart_items?.data;
	if (orderResponse.status === 200) {
		cartItems &&
			cartItems.forEach(async (cartItem: ICartItemResponse) => {
				const productInventory = cartItem.attributes.product_inventory?.data;
				if (productInventory && productInventory.attributes) {
					await updateProductInventory(`${productInventory?.id}`, {
						...productInventory.attributes,
						action: ProductInventoryActions.PURCHASED_BY_CUSTOMER,
					});
				}
			});
		if (cartId) {
			await updateCart(cartId, {
				action: orderPayload.cart.attributes.action,
				status: CartStatus.COMPLETED,
			});
		}
	}
	return orderResponse;
};
