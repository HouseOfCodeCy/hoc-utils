export interface ConfigurationInterface {
	guestCheckout: boolean;
	addToCartNeedsAccount: boolean;
	highAvailabilityThreshold: number;
	lowAvailabilityThreshold: number;
	showReviews: boolean;
	// inventoryReservationDuration (minutes)
	inventoryReservationDuration: number;
	// whether to show stock on categories and product
	showStockOnCategories: boolean;
	// the subject of the email for the order email
	orderEmailSubject: string;
}

export interface ShopConfigurationInterface {
	contactEmail: string;
	orderEmail: string;
	telephone: string;
	mapLocation: string;
	workingHours: { day: string; hours: string }[];
	addresses: string[];
	instragram: string;
	facebook: string;
	shopFullName: string;
	shopShortName: string;
	shopDescription: string;
	shopShortDescription: string;
	favicon: string;
}
