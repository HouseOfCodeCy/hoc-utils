import { IAddress, IUser } from './account';
import { ICart } from './cart';

export interface IOrder {
	id: number;
	attributes: IOrderBody;
}

export interface IOrderBody {
	users_permissions_user: { data: IUser };
	cart: { data: ICart };
	address: { data: IAddress };
}
