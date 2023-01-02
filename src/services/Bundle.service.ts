import { http } from './common/Http.service';

export const getBundle = async (bundleId: string) => {
	try {
		const response = await http.get<any>(`bundles/${bundleId}`, {
			params: { populate: 'deep' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
