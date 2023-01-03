import { IProduct } from './product';

/** CATEGORIES PARENT */
export interface IProductCategoryParent {
	id: string;
	attributes: IProductCategoryParentBody;
}
export interface IProductCategoryParentBody {
	name: string;
	description: string;
	product_categories: { data: IProductCategory[] };
}

/** CATEGORIES */
export interface IProductCategory {
	id: string;
	attributes: IProductCategoryBody;
}

export interface IProductCategoryBody {
	name: string;
	product_category_parent: { data: IProductCategoryParent };
	product_sub_categories: { data: IProductSubCategory[] };
}

/** SUB CATEGORIES */
export interface IProductSubCategory {
	id: number;
	attributes: IProductSubCategoryBody;
}
export interface IProductSubCategoryBody {
	name: string;
	products: { data: IProduct[] };
}
