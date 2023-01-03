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
};
export const ReviewUtils = {
	calculateTotalReviews,
};
