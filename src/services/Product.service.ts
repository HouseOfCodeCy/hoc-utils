import qs from 'qs';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getCategoriesLevel1 = async (
	populateType: PopulateType[] = [PopulateType.NONE],
	categoryLevel1Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				filters: categoryLevel1Id
					? {
						id: {
							$eq: categoryLevel1Id,
						},
					}
					: null,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`categories-level-1?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getCategoriesLevel2 = async (
	populateType: PopulateType[] = [PopulateType.NONE],
	categoryLevel2Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				filters: categoryLevel2Id
					? {
						id: {
							$eq: categoryLevel2Id,
						},
					}
					: null,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`categories-level-2?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getCategoriesLevel3 = async (
	populateType: PopulateType[] = [PopulateType.NONE],
	categoryLevel3Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				filters: categoryLevel3Id
					? {
						id: {
							$eq: categoryLevel3Id,
						},
					}
					: null,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`categories-level-3?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

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

export const getProductsByCategoryLevel3Id = async (
	categoryLevel3Id?: string,
	populateType: PopulateType[] = [PopulateType.PRODUCT],
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:desc'],
				populate: populateType,
				filters: categoryLevel3Id
					? {
						id: {
							$eq: categoryLevel3Id,
						},
					}
					: null,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`categories-level-3?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProduct = async (
	productId: string,
	populateType = PopulateType.DEEP,
) => {
	try {
		const response = await http.get<any>(`products/${productId}`, {
			params: { populate: populateType },
		});
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
