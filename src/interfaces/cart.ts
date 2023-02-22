// cart interfaces
import { CartAction, CartStatus } from '../resources/enums';
import { IUser, IUserFlat } from './account';
import {
	IProduct,
	IProductColor,
	IProductColorFlat,
	IProductDiscount,
	IProductDiscountFlat,
	IProductFlat,
	IProductInventory,
	IProductInventoryFlat,
	IProductSize,
	IProductSizeFlat,
} from './product';

export interface ICart {
	id: number;
	attributes: ICartBody;
}

export interface ICartBody {
	action: CartAction;
	status?: CartStatus;
	user?: IUser;
	cart_items?: ICartItem[];
}

export interface ICartFlat extends ICartBodyFlat {
	id: number;
}

export interface ICartBodyFlat {
	action: CartAction;
	status?: CartStatus;
	user?: IUserFlat;
	cart_items?: ICartItemFlat[];
}

export interface ICartResponse {
	id: number;
	attributes: ICartBodyResponse;
}

export interface ICartBodyResponse {
	action: CartAction;
	status?: CartStatus;
	user?: { data: IUser };
	cart_items?: { data: ICartItemResponse[] };
}

export interface ICartItemFlat extends ICartItemBodyFlat {
	id: string;
}

export interface ICartItemBodyFlat {
	quantity: number;
	price: number;
	product?: IProductFlat;
	cart: ICartFlat;
	product_discount?: IProductDiscountFlat;
	product_inventory?: IProductInventoryFlat;
	product_size?: IProductSizeFlat;
	product_color?: IProductColorFlat;
}

export interface ICartItem {
	id: string;
	attributes: ICartItemBody;
}

export interface ICartItemBody {
	quantity: number;
	price: number;
	product?: IProduct;
	cart: ICartResponse;
	product_inventory?: IProductInventory;
	product_discount?: IProductDiscount;
	product_size?: IProductSize;
	product_color?: IProductColor;
}

export interface ICartItemResponse {
	id: string;
	attributes: ICartItemResponseBody;
}

export interface ICartItemResponseBody {
	quantity: number;
	price: number;
	product?: { data: IProduct };
	cart: { data: ICartResponse };
	product_discount?: { data?: IProductDiscount };
	product_inventory?: { data: IProductInventory };
	product_size?: { data: IProductSize };
	product_color?: { data: IProductColor };
}
