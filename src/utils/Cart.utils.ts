import { IUser } from '../interfaces/account';
import {
	ICartBody,
	ICartItemBody,
	ICartItemFlat,
	ICartItemResponse,
	ICartResponse,
} from '../interfaces/cart';
import {
	IProduct,
	IProductColor,
	IProductInventoryBody,
	IProductSize,
} from '../interfaces/product';
import { CartAction, ProductInventoryActions } from '../resources/enums';
import {
	createCart,
	createCartItem,
	deleteCart,
	deleteCartItem,
	getCart,
	updateCartItem,
} from '../services/Cart.service';
import { StatusCode } from '../services/common/Http.service';
import {
	createProductInventory,
	deleteProductInventory,
	updateProductInventory,
} from '../services/ProductInventory.service';
import {
	calculatePriceWithQuantity,
	calculateProductPrice,
} from './Product.utils';

export const createCartActionsAndGetCart = async (
	cart: ICartResponse,
	quantity: number,
	updateCart: (cart: ICartResponse) => void,
	product?: IProduct,
	product_color?: IProductColor,
	product_size?: IProductSize,
) => {
	// create a new CartItem
	const cartItem: ICartItemBody = {
		cart: cart,
		quantity: quantity,
		price: calculatePriceFlat(
			+calculateProductPrice(false, product_size, product_color, product),
			quantity,
		),
		product: product,
		product_color: product_color,
		product_size: product_size,
	};
	// create cart item and refresh GET Cart
	await createCartItem(cartItem).then(async (res: any) => {
		if (res?.status === StatusCode.OK) {
			// create a product inventory to manage stock
			const productInventory: IProductInventoryBody = {
				quantity: quantity,
				cart_item: res.data.data,
				action: ProductInventoryActions.RESERVED_BY_CUSTOMER,
			};
			await createProductInventory(productInventory).then(
				async (productInventoryResponse: any) => {
					if (productInventoryResponse.status === StatusCode.OK) {
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
			+calculateProductPrice(
				false,
				cartItem.attributes.product_size?.data,
				cartItem.attributes.product_color?.data,
				cartItem.attributes.product?.data,
			),
			tmpQuantity,
		),
		product: cartItem.attributes.product?.data,
		cart: cart,
		product_discount: cartItem.attributes.product_discount?.data,
		product_size: cartItem.attributes.product_size?.data,
		product_color: cartItem.attributes.product_color?.data,
	};
	await updateCartItem(`${cartItem.id}`, tmpCartItem).then(async (res: any) => {
		if (res?.status === StatusCode.OK) {
			// create a product inventory to manage stock
			const productInventory: IProductInventoryBody = {
				quantity: tmpQuantity,
				cart_item: res.data.data,
				action: ProductInventoryActions.RESERVED_BY_CUSTOMER,
			};
			await updateProductInventory(
				`${cartItem.attributes.product_inventory?.data.id}`,
				productInventory,
			).then(async (productInventoryResponse: any) => {
				if (productInventoryResponse.status === StatusCode.OK) {
					await getCart(`${cart?.id}`).then((responseData: any) => {
						const resData = responseData?.data.data;
						setCartIdToLocalStorage(resData.id);
						updateCart(resData);
						return responseData;
					});
				}
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
	quantity: number,
	updateCart: (cart: ICartResponse) => void,
	product?: IProduct,
	product_color?: IProductColor,
	product_size?: IProductSize,
) => {
	const data: ICartBody = {
		action: CartAction.ADD,
		users_permissions_user: user,
	};
	await createCart(data).then(async (response: any) => {
		if (response?.status === StatusCode.OK) {
			const cartResponse = response?.data.data;

			await createCartActionsAndGetCart(
				cartResponse,
				quantity,
				updateCart,
				product,
				product_color,
				product_size,
			).then(() => {
				setCartIdToLocalStorage(cartResponse.id);
				return cartResponse;
			});
		}
	});
};

/**
 * Delete CartItem and Get Cart
 * @param cartItemId
 * @param cardId
 * @param updateCart
 */
export const deleteCartItemAndProductInventoryAndGetCart = async (
	cartItemId: string,
	productInventoryId: string,
	cardId: string,
	updateCart: (cart: ICartResponse) => void,
) => {
	await deleteCartItem(cartItemId).then(async (response: any) => {
		if (response?.status === StatusCode.OK) {
			await deleteProductInventory(productInventoryId).then(
				async (productInventoryResponse: any) => {
					if (productInventoryResponse?.status === StatusCode.OK) {
						await getCart(cardId).then((responseData: any) => {
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

/**
 * Delete CartItem, ProductInventory Cart and set cart in context to null
 * @param cartItemId
 * @param cardId
 * @param updateCart
 */
export const deleteCartItemAndProductInventoryAndCartAndGetCart = async (
	cartItemId: string,
	productInventoryId: string,
	cardId: string,
	updateCart: (cart: ICartResponse | null) => void,
) => {
	await deleteCartItem(cartItemId).then(async (response: any) => {
		if (response?.status === StatusCode.OK) {
			await deleteProductInventory(productInventoryId).then(
				async (productInventoryResponse: any) => {
					if (productInventoryResponse?.status === StatusCode.OK) {
						await deleteCart(cardId).then(async (cartResponse) => {
							updateCart(null);
							removeCartIdToLocalStorage();
							return cartResponse;
						});
					}
				},
			);
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
	cartActions: ICartItemResponse[],
	product?: IProduct,
	selectedProductColor?: IProductColor,
	selectedProductSize?: IProductSize,
) => {
	if (cartActions && cartActions.length > 0) {
		const cartActionInCart: ICartItemResponse | undefined = cartActions.find(
			(action: ICartItemResponse) =>
				action.attributes.product?.data?.id === product?.id ||
				(action.attributes.product_size?.data?.id === selectedProductSize?.id &&
					action.attributes.product_color?.data?.id ===
						selectedProductColor?.id),
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
	return totalDiscount == 0 ? `${totalDiscount}` : totalDiscount.toFixed(2);
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
			// if cart item has inventory
			if (cartItem.attributes.product_inventory) {
				totalPrice += cartItem.attributes.price;
			}
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
			if (cartItem.product_inventory) {
				totalPrice += cartItem.price;
			}
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

export const calculatePriceFlat = (price: number, quantity = 1): number => {
	return +(price * quantity).toFixed(2);
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

/**
 * Updates LocalStorage with CardId
 * @param cartId
 * @returns
 */
export const removeCartIdToLocalStorage = () => {
	const storage = globalThis?.sessionStorage;
	if (!storage) return;
	storage.removeItem('cartId');
};
