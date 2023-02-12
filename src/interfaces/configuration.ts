export interface ConfigurationInterface {
	guestCheckout: boolean;
	addToCartNeedsAccount: boolean;
	highAvailabilityThreshold: number;
	lowAvailabilityThreshold: number;
	showReviews: boolean;
	shopFullName: string;
	shopShortName: string;
	shopDescription: string;
	shopShortDescription: string;
	favicon: string;
	// inventoryReservationDuration (minutes)
	inventoryReservationDuration: number;
	// whether to show stock on categories and product
	showStockOnCategories: boolean;
}
