import { IAddress } from './account';
import { ICartResponse } from './cart';

export interface IOrderFlat extends IOrderBody {
	id: number;
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
