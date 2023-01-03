export interface IUser {
	id?: string;
	attributes: UserBody;
}

export interface UserBody {
	name: string;
	lastname: string;
	email: string;
	password: string;
	telephone: string;
	countryCode?: string;
}
