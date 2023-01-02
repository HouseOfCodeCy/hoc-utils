import { http } from './common/Http.service';

export const getAddress = async (addressId: string) => {
	try {
		const response = await http.get<any>(`address/${addressId}`, {
			params: { populate: '*' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
