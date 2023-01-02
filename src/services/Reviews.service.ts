import { http } from './common/Http.service';

export const getReviewsByBundleId = async (bundleId: string) => {
	try {
		const response = await http.get<any>(
			`reviews?filters[bundle_id][id][$eq]=${bundleId}&populate=userId`,
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
