import { IReview } from './review';

export interface IBundle {
	id: string;
	attributes: {
		name: string;
		price: number;
		description: string;
		tier: string;
		image: IImage;
		enabled: boolean;
		order: number;
		extraDescription: string;
		subscriptions: ISubscriptionModel[];
		reviews: { data: IReview[] };
	};
}

export interface IImage {
	data: {
		attributes: {
			name: string;
			alternativeText: string;
			url: string;
			width: number;
			height: number;
		};
		id: string;
	};
}

export interface ISubscriptionModel {
	period: string;
	stripeLink: string;
	price: number;
}
