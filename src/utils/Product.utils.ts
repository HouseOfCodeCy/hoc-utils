import { CartItemResponse, IProductInterface } from '../interfaces/product';

/**
 * Iterates through the cart actions and calculates the total discount of the cart
 * @param cartItems
 * @returns
 */
export const calculateTotalDiscount = (cartItems: CartItemResponse[]): string => {
	let totalDiscount = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((cartItem) => {
			if (
				cartItem.attributes.product_discount &&
				cartItem.attributes.product_discount?.data &&
				cartItem.attributes.product_discount?.data.length > 0
			) {
				cartItem.attributes.product_discount?.data.forEach((discount) => {
					totalDiscount += discount.attributes.discountPercentage;
				});
			}
		});
	}
	return totalDiscount.toFixed(2);
};

/**
 * Iterates through the cart actions and calculates the total price of cart
 * @param cartItems
 * @returns
 */
export const calculateTotalPrice = (cartItems: CartItemResponse[]): string => {
	let totalPrice = 0;
	if (cartItems.length > 0) {
		cartItems.map((cartItem) => {
			totalPrice += cartItem.attributes.price;
		});
	}
	return totalPrice.toFixed(2);
};


/**
 * Handler for quantity event handler
 * @param quantity Quantity for Add to Cart
 * @param increment If is increment or decrement
 * @returns
 */
export const quantityHandle = (quantity: number, increment: boolean) => {
	let tmpQuantity = quantity;
	if (increment && quantity < 9) {
		tmpQuantity++;
	} else if (!increment && quantity > 1) {
		tmpQuantity--;
	}
	return tmpQuantity;
};


/**
 * Returns the categories of a product in a string[]
 * @param product
 * @returns
 */
export const calculateProductCategories = (product: IProductInterface) => {
	const productCategories: string[] = [];
	product &&
		product.attributes?.product_sub_categories?.data?.map(
			(category: any, index: number) => {
				productCategories.push(
					index !== product.attributes.product_sub_categories.data.length - 1
						? `${category.attributes.name}, `
						: category.attributes.name
				);
			}
		);
	return productCategories;
};


export const calculatePrice = (
	product: IProductInterface,
	quantity?: number
): number => {
	if (quantity) {
		return +(product.attributes.price * quantity).toFixed(2);
	}
	return +product.attributes.price.toFixed(2);
};

export const calculatePriceWithQuantity = (
	price: number,
	quantity?: number
): number => {
	if (quantity) {
		return +(price * quantity).toFixed(2);
	}
	return +price.toFixed(2);
};
