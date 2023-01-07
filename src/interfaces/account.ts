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
	countryCode?: string;
	addresses?: IAddress[];
	favorite_products?: IProduct[];
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
