import { IProductDiscount, IProductDiscountResponse, IProductInterface, IProductInterfaceResponse } from './product';

export enum CartAction {
	ADD = 'ADD',
	MODIFY = 'MODIFY',
	DELETE = 'DELETE',
	CANCEL = 'CANCEL',
}

export enum CartStatus {
	INPROGRESS = 'INPROGRESS',
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

export interface CartItem {
	product: IProductInterface;
	quantity: number;
	price: number;
	product_discount?: IProductDiscount;
	cart: CartPayload | string;
}

export interface CartItemPayload {
	product: IProductInterfaceResponse;
	quantity: number;
	price: number;
	product_discount?: { data: IProductDiscountResponse[] };
	cart: CartPayload | string;
}

export interface CartPayload {
	users_permissions_user: string;
	action: CartAction;
	status?: CartStatus;
	cart_items?: CartItem[];
}
