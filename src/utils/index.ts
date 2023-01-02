import {
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
} from './Cart.utils';
import {
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateTotalDiscount,
	calculateTotalPrice,
	quantityHandle,
} from './Product.utils';

export const CartUtils = {
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
};
export const ProductUtils = {
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateTotalDiscount,
	calculateTotalPrice,
	quantityHandle,
};
