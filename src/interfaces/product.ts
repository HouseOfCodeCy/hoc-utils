import { ProductInventoryActions } from '../resources/enums';
import { ICartItemResponse } from './cart';
import { ICategoryLevel3 } from './category';

/** PRODUCT */
export interface IProductFlat extends IProductBody {
	id: string;
}
export interface IProduct {
	id: string;
	attributes: IProductBody;
}

export interface IProductBody {
	name: string;
	description: string;
	price?: number;
	mediaUrls?: string[];
	sku?: string;
	extraDescription?: string;
	product_sizes?: { data: IProductSize[] };
	product_colors?: { data: IProductColor[] };
	product_brand?: { data: IProductBrand };
	product_discount?: { data: IProductDiscount };
	product_compatibilities?: { data: IProductCompatibility[] };
	categories_level_3?: { data: ICategoryLevel3[] };
}

/** PRODUCT INVENTORY */
export interface IProductInventoryFlat extends IProductInventoryBody {
	id: string;
}

export interface IProductInventory {
	id: string;
	attributes: IProductInventoryBody;
}
export interface IProductInventoryBody {
	action: ProductInventoryActions;
	quantity: number;
	product?: IProduct;
	cart_item?: { data: ICartItemResponse };
	updatedAt?: string;
	createdAt?: string;
	comment?: string;
	vendor?: string;
	product_color?: { data: IProductColor };
	product_size?: { data: IProductSize };
}

/** PRODUCT BRANDS */
export interface IProductBrand {
	id: string;
	attributes: IProductBrandBody;
}
export interface IProductBrandBody {
	name: string;
	products?: { data: IProduct[] };
}

/** PRODUCT DISCOUNT */
export interface IProductDiscount {
	id: number;
	attributes: IProductDiscountBody;
}
export interface IProductDiscountFlat extends IProductDiscountBody {
	id: number;
}

export interface IProductDiscountBody {
	name: string;
	description: string;
	discountPercentage: number;
	startDate: Date;
	endDate: Date;
	active: boolean;
}

/** PRODUCT COMPATIBILITY */
export interface IProductCompatibility {
	id: string;
	attributes: IProductCompatibilityBody;
}
export interface IProductCompatibilityBody {
	name: string;
}

/** PRODUCT SIZES */
export interface IProductSize {
	id: string;
	attributes: IProductSizeBody;
}
export interface IProductSizeBody {
	size: string;
	price: number;
	product?: { data: IProduct };
	product_inventory?: { data: IProductInventory };
	required?: boolean;
	mediaUrls?: string[];
}

export interface IProductSizeFlat extends IProductSizeBodyFlat {
	id: string;
}
export interface IProductSizeBodyFlat {
	size: string;
	price: number;
	product?: IProductFlat;
	product_inventory?: IProductInventoryFlat;
	required?: boolean;
	mediaUrls?: string[];
}

/** PRODUCT COLOR */
export interface IProductColor {
	id: string;
	attributes: IProductColorBody;
}
export interface IProductColorBody {
	name: string;
	value: string;
	price: number;
	hex?: string;
	product?: { data: IProduct };
	product_inventory?: { data: IProductInventory };
	required?: boolean;
	mediaUrls?: string[];
}
export interface IProductColorFlat extends IProductColorBodyFlat {
	id: string;
}
export interface IProductColorBodyFlat {
	name: string;
	price: number;
	product?: IProductFlat;
	product_inventory?: IProductInventoryFlat;
	required?: boolean;
	mediaUrls?: string[];
}
