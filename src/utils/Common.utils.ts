import { format } from 'date-fns';

export const formatDate = (dateString: string, formatter: string) => {
	let formattedDate;
	// format(date, "dd/MM/yyyy'T'HH:mm:ss.SSSxxx");
	format(new Date(dateString), formatter);

	return formattedDate;
};
