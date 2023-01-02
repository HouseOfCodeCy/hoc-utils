import { IUser } from './account';

export interface IReview {
	id: string;
	attributes: IReviewBody;
}
export interface IReviewBody {
	users_permissions_user: { data: IUser };
	reviewDescription: string;
	title: string;
	rating: number;
}
