import {
	ICart,
	ICartItem,
	ICartItemBody,
	ICartItemPayload,
} from '../interfaces/cart';
import { IProduct } from '../interfaces/product';
import {
	createCartItem,
	getCart,
	updateCartItem,
} from '../services/Cart.service';
import { calculatePrice, calculatePriceWithQuantity } from './Product.utils';

export const createCartActionsAndGetCart = async (
	cart: ICart,
	product: IProduct,
	quantity: number,
	updateCart: (cart: ICart) => void,
) => {
	// create a new CartItem
	const cartItem: ICartItemPayload = {
		cart: cart,
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
	cartItem: ICartItem,
	cart: ICart,
	updateCart: (cart: ICartItem) => void,
) => {
	const tmpCartItem: ICartItemBody = {
		quantity: tmpQuantity,
		price: calculatePriceWithQuantity(
			cartItem.attributes.product.data.attributes.price,
			tmpQuantity,
		),
		product: cartItem.attributes.product,
		cart: { data: cart },
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
