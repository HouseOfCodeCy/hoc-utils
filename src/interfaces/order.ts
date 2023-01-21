import { IAddress, IAddressFlat, IUser, IUserFlat } from './account';
import { ICartFlat, ICartResponse } from './cart';

export interface IOrderFlat extends IOrderBodyFlat {
	id: number;
}

export interface IOrderBodyFlat {
	cart: ICartFlat;
	address: IAddressFlat;
	order_payment_method: IOrderPaymentMethodFlat;
	order_status: IOrderStatusFlat;
	shipping_method: IShippingMethodFlat;
	user: IUserFlat;
	createdAt: string;
	updatedAt: string;
}

export interface IOrder {
	id: number;
	attributes: IOrderBody;
}

export interface IOrderBody {
	cart: { data: ICartResponse };
	address: { data: IAddress };
	order_payment_method: { data: IOrderPaymentMethod };
	order_status: { data: IOrderStatus };
	shipping_method: { data: IShippingMethod };
	user: { data: IUser };
	createdAt: string;
	updatedAt: string;
}

export interface IOrderPaymentMethodFlat extends IOrderPaymentMethodBody {
	id: number;
}

export interface IOrderPaymentMethod {
	id: number;
	attributes: IOrderPaymentMethodBody;
}

export interface IOrderPaymentMethodBody {
	name: string;
	enabled: boolean;
}

export interface IOrderStatusFlat extends IOrderStatusBody {
	id: number;
}

export interface IOrderStatus {
	id: number;
	attributes: IOrderStatusBody;
}

export interface IOrderStatusBody {
	name: string;
}

export interface IShippingMethodFlat extends IShippingMethodBody {
	id: number;
}

export interface IShippingMethod {
	id: number;
	attributes: IShippingMethodBody;
}

export interface IShippingMethodBody {
	name: string;
	isDefault: boolean;
	order: number;
}
