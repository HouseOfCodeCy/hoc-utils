import qs from 'qs';
import { IReviewBody } from '../interfaces/review';
import { PopulateType, SortType } from '../resources/enums';
import { http } from './common/Http.service';

export const getReviews = async (sortType = SortType.UPDATED_AT_DESC) => {
	try {
		const query = qs.stringify(
			{
				sort: [sortType],
				populate: PopulateType.USER,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`reviews?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getReviewsFromProductId = async (
	productId: string,
	sortType = SortType.UPDATED_AT_DESC,
) => {
	try {
		const query = qs.stringify(
			{
				sort: [sortType],
				populate: PopulateType.USER,
				filters: {
					product: {
						id: {
							$eq: productId,
						},
					},
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`reviews?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getReviewsByUserId = async (
	userId: string,
	sortType = SortType.UPDATED_AT_DESC,
) => {
	try {
		const query = qs.stringify(
			{
				sort: [sortType],
				populate: PopulateType.PRODUCT,
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
		const response = await http.get<any>(`reviews?${query}`);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const createReview = async (data: IReviewBody) => {
	try {
		const response = await http.post<any>(`/reviews`, {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateReview = async (reviewId: string, data: IReviewBody) => {
	try {
		const response = await http.put<any>(`reviews/${reviewId}`, {
			data,
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
