import { format } from 'date-fns';

export const formatDate = (date: Date, formatter: string) => {
	let formattedDate;
	// format(date, "dd/MM/yyyy'T'HH:mm:ss.SSSxxx");
	format(date, formatter);

	return formattedDate;
};
