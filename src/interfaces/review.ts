export interface IReview {
	id: string;
	attributes: IReviewBody;
}
export interface IReviewBody {
	userId: string;
	reviewDescription: string;
	title: string;
	rating: number;
}
