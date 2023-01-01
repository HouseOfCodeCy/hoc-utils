import { CartItem, CartItemPayload, CartPayload } from '../interfaces/cart';
import { http } from './common/Http.service';

/**
 * Get Carts API by Cart ID
 * @param cartId
 * @returns
 */
export const getCart = async (cartId: string) => {
	try {
		const response = await http.get<any>(`carts/${cartId}`, {
			params: { populate: 'deep' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const createCart = async (data: CartPayload) => {
	try {
		const response = await http.post<any>('carts', {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const createCartItem = async (data: CartItem) => {
	try {
		const response = await http.post<any>('cart-items', {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateCartItem = async (cartItemId: string, data: CartItemPayload) => {
	try {
		const response = await http.put<any>(`cart-items/${cartItemId}`, {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateCart = async (cartId: string, data: CartPayload) => {
	try {
		const response = await http.put<any>(`carts/${cartId}`, {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const deleteCart = async (cartId: string) => {
	try {
		const response = await http.put<any>(`carts/${cartId}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
