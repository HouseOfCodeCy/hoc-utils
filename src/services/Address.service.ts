import { IAddressBody } from '../interfaces/account';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getAddress = async (
	addressId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`address/${addressId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

/**
 * POST Address
 * @param {IAddressBody} data The Address payload for the POST Address API
 * @returns
 */
export const createAddress = async (data: IAddressBody) => {
	try {
		const response = await http.post<any>('address', {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateAddress = async (addressId: string, data: IAddressBody) => {
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
