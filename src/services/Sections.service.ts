import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getSections = async (populateType = PopulateType.DEEP) => {
	try {
		const response = await http.get<any>(`home-sections`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
