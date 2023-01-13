import { IProduct } from './product';

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
	addresses?: IAddress[];
	favorite_products?: IProduct[];
	country: ICountryFlat;
}

export interface IAddress extends IAddressBody {
	id: number;
}

export interface IAddressBody {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	city: string;
	telephone: string;
	isDefault: boolean;
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
