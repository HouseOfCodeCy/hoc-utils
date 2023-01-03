import { IUser } from '../interfaces/account';
import {
	ICart,
	ICartBody,
	ICartItem,
	ICartItemBody,
	ICartItemPayload,
} from '../interfaces/cart';
import { IProduct } from '../interfaces/product';
import { CartAction } from '../resources/enums';
import {
	createCart,
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

/**
 * 1. Create Cart, 2. Create CartAction, 3. GET Card
 * @param cart
 * @param product
 * @param quantity
 * @param updateCart Update the context with the Card retrieved
 */
export const createCartAndCartAction = async (
	user: IUser,
	product: IProduct,
	quantity: number,
	updateCart: (cart: ICart) => void,
) => {
	const data: ICartBody = {
		action: CartAction.ADD,
		users_permissions_user: { data: user },
	};
	await createCart(data).then((response: any) => {
		if (response?.statusText === 'OK') {
			const cartResponse = response?.data.data;

			createCartActionsAndGetCart(
				cartResponse,
				product,
				quantity,
				updateCart,
			).then(() => {
				localStorage.setItem('cartId', `${cartResponse.id}`);
			});
		}
	});
};
