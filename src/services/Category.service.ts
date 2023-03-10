import qs from 'qs';
import { PopulateType, SortType } from '../resources/enums';
import { http } from './common/Http.service';

export const getCategoriesLevel1 = async (
	populateType: PopulateType[] = [
		PopulateType.CATEGORIES_LEVEL_2,
		PopulateType.CATEGORIES_LEVEL_2_LEVEL_3,
	],
	sortType: SortType[] = [SortType.ORDER_ASC],
	categoryLevel1Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: sortType,
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

export const getCategoriesLevel2ByCategoryLevel1Id = async (
	populateType: PopulateType[] = [PopulateType.NONE],
	sortType: SortType[] = [SortType.ORDER_ASC],
	categoryLevel1Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: sortType,
				populate: populateType,
				filters: categoryLevel1Id
					? {
							categories_level_1: {
								id: {
									$eq: categoryLevel1Id,
								},
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

export const getCategoriesLevel2 = async (
	populateType: PopulateType[] = [PopulateType.NONE],
	sortType: SortType[] = [SortType.ORDER_ASC],
	categoryLevel2Id?: string,
) => {
	try {
		const query = qs.stringify(
			{
				sort: sortType,
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
				sort: [SortType.ORDER_ASC],
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

export const getProductsByCategoryLevel3Id = async (
	categoryLevel3Id?: string,
	populateType: PopulateType[] = [PopulateType.PRODUCTS],
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
