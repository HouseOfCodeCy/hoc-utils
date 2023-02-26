import qs from 'qs';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getOrder = async (
	orderId: string,
	populateType = PopulateType.DEEP,
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

export const getOrdersByUserId = async (
	userId: string,
	populateType: PopulateType[] = [
		PopulateType.ADDRESS,
		PopulateType.CART,
		PopulateType.CART_CART_ITEMS,
		PopulateType.CART_CART_ITEMS_PRODUCT_COLOR,
		PopulateType.CART_CART_ITEMS_PRODUCT_SIZE,
		PopulateType.PAYMENT_METHOD,
		PopulateType.ORDER_STATUS,
		PopulateType.SHOPPING_METHOD_OPTION,
	],
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:asc'],
				populate: populateType,
				filters: {
					cart: {
						user: {
							id: {
								$eq: userId,
							},
						},
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`orders?${query}`);
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
		const query = qs.stringify(
			{
				sort: ['order:asc'],
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`order-payment-methods?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getOrderStatuses = async (populateType = PopulateType.STAR) => {
	try {
		const query = qs.stringify(
			{
				sort: ['order:asc'],
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`order-statuses?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
