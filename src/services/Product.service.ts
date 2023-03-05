import qs from 'qs';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getProducts = async (
	populateType: PopulateType[] = [
		PopulateType.PRODUCT_COLORS,
		PopulateType.PRODUCT_SIZES,
		PopulateType.PRODUCT_BRAND,
	],
	page = 1,
	pageSize = 14,
	categoryLevel3Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				pagination: {
					page: page,
					pageSize: pageSize,
				},
				filters: categoryLevel3Id
					? {
							categories_level_3: {
								id: {
									$eq: categoryLevel3Id,
								},
							},
					  }
					: null,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`products?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProduct = async (
	productId: string,
	populateType: PopulateType[] = [
		PopulateType.PRODUCT_COLORS,
		PopulateType.PRODUCT_SIZES,
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

export const getFeaturedProducts = async (
	populateType = PopulateType.DEEP,
	page = 1,
	pageSize = 2,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				pagination: {
					page: page,
					pageSize: pageSize,
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`featured-products?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
