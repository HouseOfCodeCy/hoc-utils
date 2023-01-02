import { http } from './common/Http.service';

export const checkoutCart = async (data: any) => {
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
