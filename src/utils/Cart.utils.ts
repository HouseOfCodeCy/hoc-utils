import { IUser } from '../interfaces/account';
import {
	ICartBody,
	ICartItemBody,
	ICartItemFlat,
	ICartItemResponse,
	ICartResponse,
} from '../interfaces/cart';
import { IProduct, IProductInventoryBody } from '../interfaces/product';
import { CartAction, ProductInventoryActions } from '../resources/enums';
import {
	createCart,
	createCartItem,
	getCart,
	updateCartItem,
} from '../services/Cart.service';
import { createProductInventory } from '../services/Product.service';
import { calculatePriceWithQuantity } from './Product.utils';

export const createCartActionsAndGetCart = async (
	cart: ICartResponse,
	product: IProduct,
	quantity: number,
	updateCart: (cart: ICartResponse) => void,
) => {
	// create a new CartItem
	const cartItem: ICartItemBody = {
		cart: cart,
		quantity: quantity,
		price: calculatePrice(product, quantity),
		product: product,
	};
	// create cart item and refresh GET Cart
	await createCartItem(cartItem).then(async (res: any) => {
		if (res?.statusText === 'OK') {
			// create a product inventory to manage stock
			const productInventory: IProductInventoryBody = {
				quantity: quantity,
				cart_item: res.data.data,
				action: ProductInventoryActions.ONHOLD,
			};
			await createProductInventory(productInventory).then(
				async (productInventoryResponse: any) => {
					if (productInventoryResponse.statusText === 'OK') {
						// call the PUT to update the CART with the new CartItem
						await getCart(`${cart?.id}`).then((responseData: any) => {
							updateCart(responseData?.data.data);
							setCartIdToLocalStorage(responseData?.data.data.id);
							return responseData;
						});
					}
				},
			);
		}
	});
};

export const updateCartActionAndGetCart = async (
	tmpQuantity: number,
	cartItem: ICartItemResponse,
	cart: ICartResponse,
	updateCart: (cart: ICartResponse) => void,
) => {
	const tmpCartItem: ICartItemBody = {
		quantity: tmpQuantity,
		price: calculatePriceWithQuantity(
			cartItem.attributes.product.data.attributes.price,
			tmpQuantity,
		),
		product: cartItem.attributes.product.data,
		cart: cart,
		product_discount: cartItem.attributes.product_discount?.data,
	};
	await updateCartItem(`${cartItem.id}`, tmpCartItem).then(async (res: any) => {
		if (res?.statusText === 'OK') {
			// create a product inventory to manage stock
			const productInventory: IProductInventoryBody = {
				quantity: tmpQuantity,
				cart_item: res.data.data,
				action: ProductInventoryActions.ONHOLD,
			};
			await getCart(`${cart?.id}`).then((responseData: any) => {
				const resData = responseData?.data.data;
				setCartIdToLocalStorage(resData.id);
				updateCart(resData);
				return responseData;
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
	updateCart: (cart: ICartResponse) => void,
) => {
	const data: ICartBody = {
		action: CartAction.ADD,
		users_permissions_user: user,
	};
	await createCart(data).then(async (response: any) => {
		if (response?.statusText === 'OK') {
			const cartResponse = response?.data.data;

			await createCartActionsAndGetCart(
				cartResponse,
				product,
				quantity,
				updateCart,
			).then(() => {
				setCartIdToLocalStorage(cartResponse.id);
				return cartResponse;
			});
		}
	});
};

/**
 * Checks if a product exists in the Cart - CartActions
 * @param product The product to check in the CartActions
 * @param cartActions Cart CartActions
 * @returns
 */
export const doesProductExistInCartActions = (
	product: IProduct,
	cartActions: ICartItemResponse[],
) => {
	if (cartActions && cartActions.length > 0) {
		const cartActionInCart: ICartItemResponse | undefined = cartActions.find(
			(action: ICartItemResponse) =>
				action.attributes.product?.data.id === product?.id,
		);
		return cartActionInCart ? cartActionInCart : undefined;
	} else {
		return undefined;
	}
};

/**
 * Iterates through the cart actions and calculates the total discount of the cart
 * @param cartItems
 * @returns
 */
export const calculateTotalDiscount = (
	cartItems: ICartItemResponse[],
): string => {
	let totalDiscount = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((cartItem) => {
			if (
				cartItem.attributes.product_discount &&
				cartItem.attributes.product_discount.data
			) {
				totalDiscount +=
					cartItem.attributes.product_discount.data.attributes
						?.discountPercentage;
			}
		});
	}
	return totalDiscount.toFixed(2);
};

/**
 * Iterates through the cart actions and calculates the total price of cart
 * @param cartItems
 * @returns
 */
export const calculateTotalPrice = (cartItems: ICartItemResponse[]): string => {
	let totalPrice = 0;
	if (cartItems.length > 0) {
		cartItems.map((cartItem) => {
			totalPrice += cartItem.attributes.price;
		});
	}
	return totalPrice.toFixed(2);
};
/**
 * Iterates through the cart actions and calculates the total price of cart
 * @param {ICartItemFlat[]} cartItems
 * @returns
 */
export const calculateTotalPriceFlat = (cartItems: ICartItemFlat[]): string => {
	let totalPrice = 0;
	if (cartItems.length > 0) {
		cartItems.map((cartItem) => {
			totalPrice += cartItem.price;
		});
	}
	return totalPrice.toFixed(2);
};

export const calculatePrice = (
	product: IProduct,
	quantity?: number,
): number => {
	if (quantity) {
		return +(product.attributes.price * quantity).toFixed(2);
	}
	return +product.attributes.price.toFixed(2);
};

/**
 * Updates LocalStorage with CardId
 * @param cartId
 * @returns
 */
export const setCartIdToLocalStorage = (cartId: number | string) => {
	const storage = globalThis?.sessionStorage;
	if (!storage) return;
	storage.setItem('cartId', `${cartId}`);
};
