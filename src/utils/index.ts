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
	quantityHandle,
} from './Product.utils';

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
};
