import {
	calculatePrice,
	calculateTotalDiscount,
	calculateTotalPrice,
	createCartActionsAndGetCart,
	createCartAndCartAction,
	doesProductExistInCartActions,
	updateCartActionAndGetCart,
} from './Cart.utils';
import { transformPriceToStripeAmount } from './Checkout.utils';
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
	calculatePrice,
	calculateTotalDiscount,
	calculateTotalPrice,
};
export const ProductUtils = {
	calculatePriceWithQuantity,
	calculateProductCategories,
	quantityHandle,
	getBrandAcronym,
	calculateStockAvailability,
};
export const ReviewUtils = {
	calculateTotalReviews,
};
export const CheckoutUtils = {
	transformPriceToStripeAmount,
};
