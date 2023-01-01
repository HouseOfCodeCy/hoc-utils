import { CartItem, CartItemPayload } from '../interfaces/cart';
import { CartItemResponse, ICartResponse, IProductInterface } from '../interfaces/product';
import { createCartItem, getCart, updateCartItem } from '../services/Cart.service';
import { calculatePrice, calculatePriceWithQuantity } from './Product.utils';

export const createCartActionsAndGetCart = async (
	cart: ICartResponse,
	product: IProductInterface,
	quantity: number,
	updateCart: (cart: ICartResponse) => void
) => {
	// create a new CartItem
	const cartItem: CartItem = {
		cart: `${cart.id}`,
		quantity: quantity,
		price: calculatePrice(product, quantity),
		product: product,
	};
	// create cart item and refresh GET Cart
	await createCartItem(cartItem).then((res) => {
		if (res?.statusText === 'OK') {
			// call the PUT to update the card with the new CartItem
			getCart(`${cart?.id}`).then((responseData) => {
				const resData = responseData?.data.data;
				updateCart(resData);
			});
		}
	});
};

export const updateCartActionAndGetCart = async (
	tmpQuantity: number,
	cartItem: CartItemResponse,
	cart: ICartResponse,
	updateCart: (cart: ICartResponse) => void
) => {
	const tmpCartItem: CartItemPayload = {
		quantity: tmpQuantity,
		price: calculatePriceWithQuantity(
			cartItem.attributes.product.data.attributes.price,
			tmpQuantity
		),
		product: cartItem.attributes.product,
		cart: cartItem.attributes.cart,
		product_discount: cartItem.attributes.product_discount,
	};
	await updateCartItem(`${cartItem.id}`, tmpCartItem).then((res) => {
		if (res?.statusText === 'OK') {
			getCart(`${cart?.id}`).then((responseData) => {
				const resData = responseData?.data.data;
				updateCart(resData);
			});
		}
	});
};
