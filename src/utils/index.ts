import {
	createCartActionsAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
	updateCartActionAndGetCart,
} from './Cart.utils';
import {
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateStockAvailability,
	calculateTotalDiscount,
	calculateTotalPrice,
	getBrandAcronym,
	quantityHandle,
} from './Product.utils';
import { calculateTotalReviews } from './Review.utils';

export const CartUtils = {
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
};
export const ProductUtils = {
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateTotalDiscount,
	calculateTotalPrice,
	quantityHandle,
	getBrandAcronym,
	calculateStockAvailability,
};
export const ReviewUtils = {
	calculateTotalReviews,
};
