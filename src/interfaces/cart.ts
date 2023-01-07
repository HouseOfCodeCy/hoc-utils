// cart interfaces
import { CartAction, CartStatus } from '../resources/enums';
import { IUser } from './account';
import { IProduct, IProductDiscount } from './product';

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

export interface ICartResponse {
	id: number;
	attributes: ICartBodyResponse;
}

export interface ICartBodyResponse {
	action: CartAction;
	status?: CartStatus;
	users_permissions_user?: { data: IUser };
	cart_items?: { data: ICartItem[] };
}

export interface ICartItem {
	id: string;
	attributes: ICartItemBody;
}

export interface ICartItemBody {
	quantity: number;
	price: number;
	product: IProduct;
	cart: ICart;
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
	cart: { data: ICart };
	product_discount?: { data?: IProductDiscount };
}
