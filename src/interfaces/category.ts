import { IProduct } from './product';

/** CATEGORIES COMMON */
export interface ICategoryCommonBody {
	name: string;
	description?: string;
	icon?: string;
	order?: number;
}

/** CATEGORIES */
export interface ICategoryLevel1 {
	id: string;
	attributes: ICategoryLevel1Body;
}

export interface ICategoryLevel1Body extends ICategoryCommonBody {
	categories_level_2: { data: ICategoryLevel2[] };
}

export interface ICategoryLevel2 {
	id: string;
	attributes: ICategoryLevel2Body;
}

export interface ICategoryLevel2Body extends ICategoryCommonBody {
	categories_level_3: { data: ICategoryLevel3[] };
}

export interface ICategoryLevel3 {
	id: number;
	attributes: ICategoryLevel3Body;
}

export interface ICategoryLevel3Body extends ICategoryCommonBody {
	products: { data: IProduct[] };
}
