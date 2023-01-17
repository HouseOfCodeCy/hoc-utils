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
	dateAdded?: string;
	category?: IProductCategory;
	brand?: string;
	stock?: number;
	sku?: string;
	extraDescription?: string;
	product_sub_categories?: { data: IProductSubCategory[] };
	reviews?: { data: IReview[] };
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
