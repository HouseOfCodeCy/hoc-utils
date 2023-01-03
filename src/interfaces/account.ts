export interface IUser {
	id?: string;
	attributes: {
		email: string;
		username: string;
		name: string;
		lastname: string;
		telephone: string;
		countryCode: string;
		password?: string;
		favorites?: number[];
	};
}

export interface UserPayload {
	name: string;
	lastname: string;
	email: string;
	password: string;
	telephone: string;
	countryCode?: string;
}
