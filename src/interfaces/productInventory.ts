export interface IProductOptions {
	// stock for colors
	colorInventory?: {
		// color id
		id: number;
		// relation of this color id with sizes
		sizeInventory?: { id: number; quantity: number }[] | null;
		total: number;
	}[];
	// stock for sizes
	sizeInventory?: {
		// color id
		id: number;
		// relation of this color id with sizes
		colorInventory?: { id: number; quantity: number }[] | null;
		total: number;
	}[];
	total?: number;
}
