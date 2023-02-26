import qs from 'qs';
import { IAddressBody, IUserFlat } from '../interfaces/account';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getAddress = async (
	addressId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`addresses/${addressId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getAddressesByUserId = async (
	userId: string,
	populateType: PopulateType[] = [PopulateType.CITY, PopulateType.CITY_COUNTRY],
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:asc'],
				populate: populateType,
				filters: {
					user: {
						id: {
							$eq: userId,
						},
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`addresses?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

/**
 * POST Address
 * @param {IAddressBody} data The Address payload for the POST Address API
 * @param {IUserFlat} user Send this param if you want the address to be added to a user
 * @param {void} addUser Send this param if you want context of user to be updated
 * @returns
 */
export const createAddress = async (
	data: any,
	user?: IUserFlat,
	addUser?: (user: IUserFlat) => void,
) => {
	try {
		const response = await http.post<any>('addresses', {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateAddress = async (
	addressId: string,
	data: IAddressBody,
	addUser?: (user: IUserFlat) => void,
) => {
	try {
		const response = await http.put<any>(`addresses/${addressId}`, {
			data,
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getCities = async (populateType = PopulateType.STAR) => {
	try {
		const response = await http.get<any>(`cities`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
