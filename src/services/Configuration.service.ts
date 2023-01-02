import { ConfigurationInterface } from '../interfaces/configuration';
import { http } from './common/Http.service';

export const getConfiguration = async () => {
	try {
		const response = await http.get<any>(`app-configuration`, {
			params: { populate: 'deep' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateConfiguration = async (data: {
	data: ConfigurationInterface;
}) => {
	try {
		const response = await http.put<any>(`app-configuration`, {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
