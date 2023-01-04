import { IUser } from './account';

export interface IOrder {
	id: number;
	attributes: IOrderBody;
}

export interface IOrderBody {
	users_permissions_user: IUser;
}
