import { http } from './common/Http.service';

export const getOrder = async (orderId: string) => {
	try {
		const response = await http.get<any>(`orders/${orderId}`, {
			params: { populate: 'deep' },
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
