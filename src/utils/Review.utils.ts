import { IReview } from '../interfaces/review';

export const calculateTotalReviews = (reviews: IReview[]): string => {
	let averageRating = 0;
	let totalReviewRating = 0;

	// get total review count of all reviews of the bundle
	if (reviews && reviews.length > 0) {
		reviews?.forEach((review: IReview) => {
			totalReviewRating += review.attributes.rating;
		});

		// get the average by total divided by number of reviews
		averageRating = totalReviewRating / reviews?.length;
	}
	return averageRating.toFixed(1);
};
