import { IProductFlat } from './product';
import { IReviewFlat } from './review';

export interface IUserFlat extends IUserBody {
	id?: string;
}

export interface IUser {
	id?: string;
	attributes: IUserBody;
}

export interface IUserBody {
	name: string;
	lastname: string;
	email: string;
	password: string;
	telephone: string;
	addresses?: IAddressFlat[];
	favorite_products?: IProductFlat[];
	reviews?: IReviewFlat[];
}

export interface IAddress {
	id: number;
	attributes: IAddressBody;
}

export interface IAddressFlat extends IAddressBody {
	id: number;
}

export interface IAddressBody {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	telephone: string;
	city: ICityFlat;
	isDefault: boolean;
}

export interface ICity {
	id: number;
	attributes: ICityBody;
}
export interface ICityFlat extends ICityBody {
	id: number;
}
export interface ICityBody {
	name: string;
	country: ICountryFlat;
	order: number;
}

export interface ICountry {
	id: number;
	attributes: ICountryBody;
}

export interface ICountryFlat extends ICountryBody {
	id: number;
}

export interface ICountryBody {
	name: string;
	code: string;
	dialCode: string;
}
