import { format } from 'date-fns';
import { DateTypes } from '../resources/enums';

export const formatDate = (
	dateString: string,
	formatter = DateTypes.DATETIME,
) => {
	return format(new Date(dateString), formatter);
};

/**
 * Insert a space after the position defined (e.g 22 123123)
 * @param telephoneNumber
 * @param position
 * @returns
 */
export const formatTelephoneNumber = (
	telephoneNumber: string,
	position = 2,
) => {
	return (
		telephoneNumber.slice(0, position) + ' ' + telephoneNumber.slice(position)
	);
};
