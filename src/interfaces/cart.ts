// cart interfaces
import { CartAction, CartStatus } from '../resources/enums';
import { IUser, IUserFlat } from './account';
import {
	IProduct,
	IProductDiscount,
	IProductDiscountFlat,
	IProductFlat,
	IProductInventory,
	IProductInventoryFlat,
} from './product';

export interface ICart {
	id: number;
	attributes: ICartBody;
}

export interface ICartBody {
	action: CartAction;
	status?: CartStatus;
	users_permissions_user?: IUser;
	cart_items?: ICartItem[];
}

export interface ICartFlat extends ICartBodyFlat {
	id: number;
}

export interface ICartBodyFlat {
	action: CartAction;
	status?: CartStatus;
	users_permissions_user?: IUserFlat;
	cart_items?: ICartItemFlat[];
}

export interface ICartResponse {
	id: number;
	attributes: ICartBodyResponse;
}

export interface ICartBodyResponse {
	action: CartAction;
	status?: CartStatus;
	users_permissions_user?: { data: IUser };
	cart_items?: { data: ICartItemResponse[] };
}

export interface ICartItemFlat extends ICartItemBodyFlat {
	id: string;
}

export interface ICartItemBodyFlat {
	quantity: number;
	price: number;
	product: IProductFlat;
	cart: ICartFlat;
	product_discount?: IProductDiscountFlat;
	product_intentory?: IProductInventoryFlat;
}

export interface ICartItem {
	id: string;
	attributes: ICartItemBody;
}

export interface ICartItemBody {
	quantity: number;
	price: number;
	product: IProduct;
	cart: ICartResponse;
	product_intentory?: IProductInventory;
	product_discount?: IProductDiscount;
}

export interface ICartItemResponse {
	id: string;
	attributes: ICartItemResponse;
}

export interface ICartItemResponse {
	quantity: number;
	price: number;
	product: { data: IProduct };
	cart: { data: ICartResponse };
	product_discount?: { data?: IProductDiscount };
	product_intentory?: { data: IProductInventory };
}
