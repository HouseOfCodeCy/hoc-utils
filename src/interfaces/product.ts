import { CartAction, CartStatus } from "./cart";

// Cart
export interface ICartResponse {
	id: number;
	attributes: CartResponse;
}

export interface CartResponse {
	action: CartAction;
	cart_items?: { data: CartItemResponse[] };
	status?: CartStatus;
	users_permissions_user: string;
}

export interface IProductCategory {
	id: number;
	name: string;
	animal: any;
	subCategories: IProductSubCategory[];
}

export interface IProductInterfaceResponse {
	data: {
		id: number;
		attributes: {
			name: string;
			description: string;
			price: number;
			dateAdded?: string;
			category?: IProductCategory;
			brand?: string;
			stock?: number;
			sku?: string;
			extraDescription?: string;
			productSizes?: string[];
			mediaUrl: string;
			product_sizes: {
				data: [
					{
						id: number;
						attributes: {
							size: string;
						};
					},
				];
			};
			product_brand: {
				data: {
					id: number;
					attributes: {
						name: string;
					};
				};
			};
			product_sub_categories: {
				data: [
					{
						id: number;
						attributes: {
							name: string;
						};
					},
				];
			};
		};
	};
}

export interface IProductSubCategory {
	id: number;
	name: string;
}

export interface IProductDiscountResponse {
	id: number;
	attributes: {
		name: string;
		description: string;
		discountPercentage: number;
		startDate: Date;
		endDate: Date;
		active: boolean;
	};
}

export interface CartItemResponse {
	id: number;
	attributes: {
		cart: { data: ICartResponse } | string;
		price: number;
		product: IProductInterfaceResponse;
		product_discount?: { data: IProductDiscountResponse[] };
		quantity: number;
	};
}

export interface IProductInterface {
	id: number;
	attributes: {
		name: string;
		description: string;
		price: number;
		dateAdded?: string;
		category?: IProductCategory;
		brand?: string;
		stock?: number;
		sku?: string;
		extraDescription?: string;
		productSizes?: string[];
		mediaUrl: string;
		product_sizes: {
			data: [
				{
					id: number;
					attributes: {
						size: string;
					};
				},
			];
		};
		product_brand: {
			data: {
				id: number;
				attributes: {
					name: string;
				};
			};
		};
		product_sub_categories: {
			data: [
				{
					id: number;
					attributes: {
						name: string;
					};
				},
			];
		};
	};
}


export interface IProductDiscount {
	name: string;
	description: string;
	discountPercentage: number;
	startDate: Date;
	endDate: Date;
	active: boolean;
}
