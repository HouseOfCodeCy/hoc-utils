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
	product: { data: IProduct };
	cart: { data: ICart };
	product_discount?: { data: IProductDiscount };
}
