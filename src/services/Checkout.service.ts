import { ICheckoutBody } from '../interfaces/checkout';
import { http } from './common/Http.service';

export const checkoutCart = async (data: ICheckoutBody) => {
	try {
		const response = await http.post<any>(`/checkouts`, data);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
