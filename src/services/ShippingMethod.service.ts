import qs from 'qs';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getShippingMethods = async (populateType = PopulateType.STAR) => {
	try {
		const query = qs.stringify(
			{
				sort: ['order:asc'],
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`shipping-methods?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getShippingMethodsOptions = async (
	populateType = PopulateType.STAR,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['name:asc'],
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`shipping-method-options?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getShippingMethodsOptionsByShippingMethodId = async (
	shippingMethodId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['name:asc'],
				populate: populateType,
				filters: {
					shipping_method: {
						id: {
							$eq: shippingMethodId,
						},
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`shipping-method-options?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
