import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getOrder = async (
	orderId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`orders/${orderId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const createOrder = async (data: any) => {
	try {
		const response = await http.post<any>(`/orders`, {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getOrderPaymentMethods = async (
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`order-payment-methods`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getShippingMethods = async (populateType = PopulateType.STAR) => {
	try {
		const response = await http.get<any>(`shipping-methods`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
