import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

/**
 * Get User API by UserID
 * @param userId
 * @param {PopulateType} populateType
 * @returns Axios Response
 */
export const getUser = async (
	userId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`users/${userId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
