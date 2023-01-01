import { CartItem, CartItemPayload } from '../interfaces/cart';
import { CartItemResponse, ICartResponse, IProductInterface } from '../interfaces/product';
import { createCartItem, getCart, updateCartItem } from '../services/Cart.service';
import { calculatePrice, calculatePriceWithQuantity } from './Product.utils';

export const createCartActionsAndGetCart = async (
	cart: ICartResponse,
	product: IProductInterface,
	quantity: number,
	updateCart: (cart: ICartResponse) => void,
) => {
	// create a new CartItem
	const cartItem: CartItem = {
		cart: `${cart.id}`,
		quantity: quantity,
		price: calculatePrice(product, quantity),
		product: product,
	};
	// create cart item and refresh GET Cart
	await createCartItem(cartItem).then((res: any) => {
		if (res['statusText'] === 'OK') {
			// call the PUT to update the card with the new CartItem
			getCart(`${cart?.id}`).then((responseData: any) => {
				updateCart(responseData?.data.data);
			});
		}
	});
};

export const updateCartActionAndGetCart = async (
	tmpQuantity: number,
	cartItem: CartItemResponse,
	cart: ICartResponse,
	updateCart: (cart: ICartResponse) => void,
) => {
	const tmpCartItem: CartItemPayload = {
		quantity: tmpQuantity,
		price: calculatePriceWithQuantity(cartItem.attributes.product.data.attributes.price, tmpQuantity),
		product: cartItem.attributes.product,
		cart: {
			users_permissions_user: cartItem.attributes.cart.data.attributes.users_permissions_user,
			action: cartItem.attributes.cart.data.attributes.action,
			status: cartItem.attributes.cart.data.attributes.status,
			cart_items: cartItem.attributes.cart.data.attributes.cart_items?.data.map((cartItem) => {
				return {
					product: `${cartItem.attributes.product.data.id}`,
					quantity: cartItem.attributes.quantity,
					price: cartItem.attributes.price,
					product_discount: cartItem.attributes.product_discount?.data.map((discount) => `${discount.attributes}`),
					cart: `${cartItem.attributes.cart.data.id}`,
				};
			}),
		},
		product_discount: cartItem.attributes.product_discount,
	};
	await updateCartItem(`${cartItem.id}`, tmpCartItem).then((res: any) => {
		if (res?.statusText === 'OK') {
			getCart(`${cart?.id}`).then((responseData: any) => {
				const resData = responseData?.data.data;
				updateCart(resData);
			});
		}
	});
};
