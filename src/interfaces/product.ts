import { ProductInventoryActions } from '../resources/enums';
import { ICartItem } from './cart';
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
	mediaUrl: string;
	stock: number;
	category?: IProductCategory;
	brand?: string;
	sku?: string;
	extraDescription?: string;
	reviews?: { data: IReview[] };
	product_sub_categories?: { data: IProductSubCategory[] };
	product_sizes?: { data: IProductSize[] };
	product_brand?: { data: IProductBrand };
	product_discount?: { data: IProductDiscount };
	product_compatibilities?: { data: IProductCompatibility[] };
	product_colors?: { data: IProductColor[] };
}

/** PRODUCT SIZES */
export interface IProductSize {
	id: string;
	attributes: IProductSizeBody;
}
export interface IProductSizeBody {
	size: string;
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
	cart_item: ICartItem;
	quantity: number;
	updatedAt: string;
	createdAt: string;
	action?: ProductInventoryActions;
	comment?: string;
	vendor?: string;
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
export interface IProductColor {
	id: string;
	attributes: IProductColorBody;
}
export interface IProductColorBody {
	name: string;
}
