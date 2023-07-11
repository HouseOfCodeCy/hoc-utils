import qs from 'qs';
import { PopulateType, SortType } from '../resources/enums';
import { http } from './common/Http.service';

export const getSections = async (
	populateType = PopulateType.DEEP,
	sortType: SortType[] = [SortType.ORDER_ASC],
) => {
	try {
		const query = qs.stringify(
			{
				sort: sortType,
				populate: populateType,
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`home-sections?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
