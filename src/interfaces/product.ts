import { ProductInventoryActions } from '../resources/enums';
import { ICartItemResponse } from './cart';
import { IProductCategory, IProductSubCategory } from './category';
import { IReview } from './review';

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
	price: number;
	mediaUrls?: string[];
	category?: IProductCategory;
	sku?: string;
	extraDescription?: string;
	product_sizes?: { data: IProductSize[] };
	product_colors?: { data: IProductColor[] };
	reviews?: { data: IReview[] };
	product_sub_categories?: { data: IProductSubCategory[] };
	product_brand?: { data: IProductBrand };
	product_discount?: { data: IProductDiscount };
	product_compatibilities?: { data: IProductCompatibility[] };
}

/** PRODUCT SIZES */
export interface IProductSizeFlat extends IProductSizeBody {
	id: string;
}
export interface IProductSize {
	id: string;
	attributes: IProductSizeBody;
}
export interface IProductSizeBody {
	size: string;
	price: number;
	product?: { data: IProduct };
	product_inventory?: { data: IProductInventory };
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

/** PRODUCT COLOR */
export interface IProductColorFlat extends IProductColorBody {
	id: string;
}
export interface IProductColor {
	id: string;
	attributes: IProductColorBody;
}
export interface IProductColorBody {
	name: string;
	price: number;
	product?: {data: IProduct};
	product_inventory?: { data: IProductInventory };
}
