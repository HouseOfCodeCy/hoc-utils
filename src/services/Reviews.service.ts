import qs from 'qs';
import { IReviewBody } from '../interfaces/review';
import { http } from './common/Http.service';

export const getReviews = async () => {
	try {
		const query = qs.stringify(
			{
				sort: ['updatedAt:desc'],
				populate: 'user',
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

export const getReviewsFromProductId = async (productId: string) => {
	try {
		const query = qs.stringify(
			{
				sort: ['updatedAt:desc'],
				populate: 'user',
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

export const getReviewsByUserId = async (userId: string) => {
	try {
		const query = qs.stringify(
			{
				sort: ['updatedAt:desc'],
				populate: 'product',
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
