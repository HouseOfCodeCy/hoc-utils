import {
	getDefaultAddress,
	getDefaultAddressFlat,
	printAddressAsString,
	printAddressAsStringFlat,
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
	getCartItemMedia,
	getCartItemOptions,
	getCartItemPrice,
	getCartItemProduct,
	getCartItemProductFlat,
} from './CartItem.utils';
import {
	checkoutCartAndUpdateProductInventory,
	transformPriceToStripeAmount,
} from './Checkout.utils';
import { formatDate, formatTelephoneNumber } from './Common.utils';
import {
	getDefaultShippingMethod,
	getOrderTotal,
	getShippingMethodValue,
} from './Order.utils';
import {
	addProductToFavorites,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateProductPrice,
	getBrandAcronym,
	getProductMediaUrls,
	getProductPriceRange,
	isProductFavorite,
	printPriceRanges,
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

export const CartItemUtils = {
	getCartItemMedia,
	getCartItemProduct,
	getCartItemProductFlat,
	getCartItemOptions,
	getCartItemPrice,
};
export const AccountUtils = {
	tranformUserFlatToUser,
	printAddressAsStringFlat,
	getDefaultAddress,
	getDefaultAddressFlat,
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
	printPriceRanges,
	getProductMediaUrls,
	quantityHandle,
	calculateProductPrice,
	getBrandAcronym,
	isProductFavorite,
	addProductToFavorites,
	getProductPriceRange,
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
	formatTelephoneNumber,
};
export const OrderUtils = {
	getDefaultShippingMethod,
	getOrderTotal,
	getShippingMethodValue,
};
