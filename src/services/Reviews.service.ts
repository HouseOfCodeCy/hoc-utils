import { http } from './common/Http.service';

export const getReviews = async () => {
	try {
		const response = await http.get<any>(`reviews?`, {
			params: { populate: 'user' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getReviewsByUserId = async (userId: string) => {
	try {
		const response = await http.get<any>(
			`reviews?filters[user][id][$eq]=${userId}`,
			{
				params: { populate: 'user' },
			},
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
