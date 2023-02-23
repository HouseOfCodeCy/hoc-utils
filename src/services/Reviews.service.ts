import qs from 'qs';
import { http } from './common/Http.service';

export const getReviews = async () => {
	try {
		const query = qs.stringify(
			{
				sort: ['updatedAt:asc'],
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

export const getReviewsByUserId = async (userId: string) => {
	try {
		const query = qs.stringify(
			{
				sort: ['updatedAt:asc'],
				populate: 'user',
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
