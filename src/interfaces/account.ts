import { IProductFlat } from './product';

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
	favorite_products?: IProductFlat[];
}

export interface IAddress {
	id: number;
	attributes: IAddressBody;
}

export interface IAddressFlat extends IAddressBodyFlat {
	id: number;
}

export interface IAddressBodyFlat {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	telephone: string;
	city: ICityFlat;
	isDefault: boolean;
	user?: IUser;
}

export interface IAddressBody {
	name: string;
	address1: string;
	address2: string;
	postCode: string;
	telephone: string;
	city: { data: ICity };
	isDefault: boolean;
	user?: { data: IUser };
}

export interface ICity {
	id: number;
	attributes: ICityBody;
}
export interface ICityFlat extends ICityBodyFlat {
	id: number;
}
export interface ICityBody {
	name: string;
	country: { data: ICountry };
	order: number;
}
export interface ICityBodyFlat {
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
