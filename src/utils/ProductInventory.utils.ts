import { differenceInMinutes } from 'date-fns';
import { IProductInventory } from '../interfaces/product';
import { ProductInventoryActions } from '../resources/enums';
import { getProductInventoryByProduct } from '../services/ProductInventory.service';

export const calculateProductInventory = async (productId: string) => {
	// retrieve the ProductInventory for the given product
	const productInventoryResponse: any = await getProductInventoryByProduct(
		productId,
	);
	if (productInventoryResponse.statusText === 'OK') {
		const productInventories = productInventoryResponse.data?.data;
		return calculateProductInventoryTotalNumber(productInventories);
	}
	return 0;
};

/**
 * Receives product inventory and display appropriate label based on the number of stock count
 * @param productInventories
 * @param lowAvailabilityThreshold A threshold for emphasizing low in stock
 * @param highAvailabilityThreshold A threshold for emphasizing high in stock
 * @returns
 */
export const calculateProductInventoryAvailability = (
	productInventories: IProductInventory[],
	lowAvailabilityThreshold = 3,
	highAvailabilityThreshold = 5,
) => {
	let availability = '';
	if (productInventories.length > 0) {
		const stockAvailability =
			calculateProductInventoryTotalNumber(productInventories);
		if (stockAvailability === 0) {
			availability = 'Out of Stock';
		} else if (stockAvailability >= highAvailabilityThreshold) {
			availability = 'In Stock';
		} else if (stockAvailability >= lowAvailabilityThreshold) {
			availability = 'Low in Stock';
		}
		return availability;
	} else {
		return 'In Stock';
	}
};

/**
 * Receives number and display appropriate label based on the number of stock count
 * @param stock
 * @param lowAvailabilityThreshold A threshold for emphasizing low in stock
 * @param highAvailabilityThreshold A threshold for emphasizing high in stock
 * @returns
 */
export const calculateProductInventoryLabel = (
	stock: number,
	lowAvailabilityThreshold = 3,
	highAvailabilityThreshold = 5,
) => {
	let availability = '';

	if (stock === 0) {
		availability = 'Out of Stock';
	} else if (stock >= highAvailabilityThreshold) {
		availability = 'In Stock';
	} else if (stock >= lowAvailabilityThreshold) {
		availability = 'Low in Stock';
	}
	return availability;
};

/**
 * Receives fetched product inventories and returns a number for total stock
 * @param productInventories The Product Inventories
 * @returns
 */
export const calculateProductInventoryTotalNumber = (
	productInventories: IProductInventory[],
	inventoryReservationDuration = 60,
) => {
	let totalStock = 0;
	if (productInventories.length > 0) {
		productInventories.map((inventory: IProductInventory) => {
			switch (inventory.attributes.action) {
				case ProductInventoryActions.STOCK_REFILL:
				case ProductInventoryActions.RETURNED_BY_CUSTOMER:
					totalStock += inventory.attributes.quantity;
					break;
				case ProductInventoryActions.RESERVED_BY_CUSTOMER:
					if (inventory.attributes.updatedAt) {
						const differenceInMins = differenceInMinutes(
							Date.now(),
							new Date(inventory.attributes.updatedAt),
						);
						if (differenceInMins <= inventoryReservationDuration) {
							totalStock -= inventory.attributes.quantity;
						}
					}
					break;
				case ProductInventoryActions.PURCHASED_BY_CUSTOMER:
				case ProductInventoryActions.SHIPPED_TO_CUSTOMER:
					totalStock -= inventory.attributes.quantity;
					break;

				default:
					break;
			}
		});
	}
	return totalStock;
};
