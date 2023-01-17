import { IUser } from './account';
import { IProduct } from './product';

export interface IReviewFlat extends IReviewBody {
	id: string;
}

export interface IReview {
	id: string;
	attributes: IReviewBody;
}
export interface IReviewBody {
	users_permissions_user: { data: IUser };
	reviewDescription: string;
	title: string;
	rating: number;
	product: { data: IProduct };
}
