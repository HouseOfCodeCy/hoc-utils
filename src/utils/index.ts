import {
	getDefaultAddress,
	printAddressAsString,
	tranformUserFlatToUser,
} from './Account.utils';

import {
	calculatePrice,
	calculateTotalDiscount,
	calculateTotalPrice,
	calculateTotalPriceFlat,
	createCartActionsAndGetCart,
	createCartAndCartAction,
	deleteCartItemAndCartAndGetCart,
	deleteCartItemAndGetCart,
	doesProductExistInCartActions,
	removeCartIdToLocalStorage,
	setCartIdToLocalStorage,
	updateCartActionAndGetCart,
} from './Cart.utils';
import {
	checkoutCartAndUpdateProductInventory,
	transformPriceToStripeAmount,
} from './Checkout.utils';
import { formatDate } from './Common.utils';
import {
	addProductToFavorites,
	calculatePriceWithQuantity,
	calculateProductCategories,
	getBrandAcronym,
	isProductFavorite,
	quantityHandle,
	transformProductToProductFlat,
} from './Product.utils';
import {
	calculateProductInventory,
	calculateProductInventoryAvailability,
	calculateProductInventoryLabel,
	calculateProductInventoryTotalNumber,
} from './ProductInventory.utils';
import { calculateTotalReviews } from './Review.utils';

export const CartUtils = {
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
	calculatePrice,
	calculateTotalDiscount,
	calculateTotalPrice,
	calculateTotalPriceFlat,
	setCartIdToLocalStorage,
	removeCartIdToLocalStorage,
	deleteCartItemAndCartAndGetCart,
	deleteCartItemAndGetCart,
};
export const AccountUtils = {
	tranformUserFlatToUser,
	getDefaultAddress,
	printAddressAsString,
};
export const ProductInventoryUtils = {
	calculateProductInventory,
	calculateProductInventoryAvailability,
	calculateProductInventoryTotalNumber,
	calculateProductInventoryLabel,
};
export const ProductUtils = {
	calculatePriceWithQuantity,
	calculateProductCategories,
	quantityHandle,
	getBrandAcronym,
	isProductFavorite,
	addProductToFavorites,
	transformProductToProductFlat,
};
export const ReviewUtils = {
	calculateTotalReviews,
};
export const CheckoutUtils = {
	transformPriceToStripeAmount,
	checkoutCartAndUpdateProductInventory,
};
export const CommonUtils = {
	formatDate,
};
