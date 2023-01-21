import { format } from 'date-fns';
import { DateTypes } from '../resources/enums';

export const formatDate = (
	dateString: string,
	formatter = DateTypes.DATETIME,
) => {
	return format(new Date(dateString), formatter);
};
