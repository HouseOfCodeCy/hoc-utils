import qs from 'qs';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getProducts = async (populateType = PopulateType.STAR) => {
	try {
		const response = await http.get<any>(`products`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProduct = async (
	productId: string,
	populateType: PopulateType[] = [
		PopulateType.PRODUCT_COLOR,
		PopulateType.PRODUCT_SIZE,
		PopulateType.PRODUCT_BRAND,
		PopulateType.CATEGORIES_LEVEL_3,
		PopulateType.PRODUCT_COMPATIBILITIES,
	],
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`products/${productId}?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getFeaturedProducts = async (populateType = PopulateType.DEEP) => {
	try {
		const response = await http.get<any>(`featured-products`, {
			params: { populate: populateType },
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
