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
	reviewDescription: string;
	title: string;
	rating: number;
	user?: { data: IUser };
	product?: { data: IProduct };
	createdAt?: string;
	updatedAt?: string;
}
