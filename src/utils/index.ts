import {
	getDefaultAddress,
	printAddressAsString,
	tranformUserFlatToUser,
} from './Account.utils';

import {
	calculatePrice,
	calculatePriceFlat,
	calculateTotalDiscount,
	calculateTotalPrice,
	calculateTotalPriceFlat,
	createCartActionsAndGetCart,
	createCartAndCartAction,
	deleteCartItemAndProductInventoryAndCartAndGetCart,
	deleteCartItemAndProductInventoryAndGetCart,
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
	calculateProductPrice,
	getBrandAcronym,
	isProductFavorite,
	quantityHandle,
	transformProductToProductFlat,
} from './Product.utils';
import {
	calculateProductInventory,
	calculateProductInventoryAvailability,
	calculateProductInventoryLabel,
	calculateProductInventoryOptions,
	calculateProductInventoryTotalNumber,
	constructMappedProductInventory,
	renderAvailabilityLabel,
} from './ProductInventory.utils';
import { calculateTotalReviews } from './Review.utils';

export const CartUtils = {
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
	calculatePrice,
	calculatePriceFlat,
	calculateTotalDiscount,
	calculateTotalPrice,
	calculateTotalPriceFlat,
	setCartIdToLocalStorage,
	removeCartIdToLocalStorage,
	deleteCartItemAndProductInventoryAndCartAndGetCart,
	deleteCartItemAndProductInventoryAndGetCart,
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
	calculateProductInventoryOptions,
	constructMappedProductInventory,
	renderAvailabilityLabel,
};
export const ProductUtils = {
	calculatePriceWithQuantity,
	calculateProductCategories,
	quantityHandle,
	calculateProductPrice,
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
