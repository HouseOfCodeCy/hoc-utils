import {
	calculatePrice,
	calculateTotalDiscount,
	calculateTotalPrice,
	createCartActionsAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
	updateCartActionAndGetCart,
} from './Cart.utils';
import { tranformPriceToStripeAmount } from './Checkout.utils';
import {
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateStockAvailability,
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
export const CheckoutUtils = {
	tranformPriceToStripeAmount,
};
