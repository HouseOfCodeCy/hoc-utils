import {
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	calculateTotalDiscount,
	calculateTotalPrice,
	quantityHandle,
} from './utils/Product.utils';

import { createCartActionsAndGetCart, updateCartActionAndGetCart } from './utils/Cart.utils';

export {
	calculateTotalDiscount,
	calculateTotalPrice,
	calculatePrice,
	calculatePriceWithQuantity,
	calculateProductCategories,
	quantityHandle,
	createCartActionsAndGetCart,
	updateCartActionAndGetCart,
};
