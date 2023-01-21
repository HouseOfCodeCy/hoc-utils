import { formatDate } from './Common.utils';

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
	doesProductExistInCartActions,
	setCartIdToLocalStorage,
	updateCartActionAndGetCart,
} from './Cart.utils';
import { transformPriceToStripeAmount } from './Checkout.utils';
import {
	addProductToFavorites,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateStockAvailability,
	getBrandAcronym,
	isProductFavorite,
	quantityHandle,
	transformProductToProductFlat,
} from './Product.utils';
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
};
export const AccountUtils = {
	tranformUserFlatToUser,
	getDefaultAddress,
	printAddressAsString,
};
export const ProductUtils = {
	calculatePriceWithQuantity,
	calculateProductCategories,
	quantityHandle,
	getBrandAcronym,
	calculateStockAvailability,
	isProductFavorite,
	addProductToFavorites,
	transformProductToProductFlat,
};
export const ReviewUtils = {
	calculateTotalReviews,
};
export const CheckoutUtils = {
	transformPriceToStripeAmount,
};
export const CommonUtils = {
	formatDate,
};
