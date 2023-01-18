import { IUserFlat } from '../interfaces/account';
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
		if (response.status === 200) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateUser = async (updatedUser: IUserFlat) => {
	try {
		const response = await http.put<any>(`users/${updatedUser.id}`, {
			updatedUser,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
