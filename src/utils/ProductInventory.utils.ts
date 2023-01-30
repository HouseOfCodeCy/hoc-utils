import { differenceInMinutes } from 'date-fns';
import { IProduct, IProductInventory } from '../interfaces/product';
import { ProductInventoryActions } from '../resources/enums';
import { getProductInventoryByAll } from '../services/ProductInventory.service';

export const calculateProductInventory = async (product: IProduct) => {
	// retrieve the ProductInventory for the given product
	const productInventoryResponse: any = await getProductInventoryByAll(product);
	if (productInventoryResponse.statusText === 'OK') {
		const productInventories = productInventoryResponse.data?.data;
		return calculateProductInventoryOptions(productInventories);
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

/**
 * Receives fetched product inventories and returns a number for total stock PER OPTION
 * @param productInventories The Product Inventories
 * @returns
 */
export const calculateProductInventoryOptions = (
	productInventories: IProductInventory[],
	inventoryReservationDuration = 60,
) => {
	const productOptionsInventories: any = {
		colorInventory: {},
		sizeInventory: {},
		productInventory: 0,
	};
	if (productInventories.length > 0) {
		productInventories.map((inventory: IProductInventory) => {
			switch (inventory.attributes.action) {
				case ProductInventoryActions.STOCK_REFILL:
				case ProductInventoryActions.RETURNED_BY_CUSTOMER:
					// if this is stock related to product colors
					if (inventory.attributes.product_color?.data) {
						productOptionsInventories.colorInventory[
							inventory.attributes.product_color?.data.id
						] = productOptionsInventories.colorInventory[
							inventory.attributes.product_color?.data.id
						]
							? productOptionsInventories.colorInventory[
									inventory.attributes.product_color?.data.id
							  ] + inventory.attributes.quantity
							: 0 + inventory.attributes.quantity;
					}
					// if this is related to product_size stock inventory
					else if (inventory.attributes.product_size?.data) {
						productOptionsInventories.sizeInventory[
							inventory.attributes.product_size?.data.id
						] = productOptionsInventories.colorInventory[
							inventory.attributes.product_size?.data.id
						]
							? productOptionsInventories.sizeInventory[
									inventory.attributes.product_size?.data.id
							  ] + inventory.attributes.quantity
							: 0 + inventory.attributes.quantity;
					}
					// if this product has no option inventories assigned, get the stock from the product
					else {
						productOptionsInventories.productInventory +=
							inventory.attributes.quantity;
					}
					break;
				case ProductInventoryActions.RESERVED_BY_CUSTOMER:
					if (inventory.attributes.updatedAt) {
						const differenceInMins = differenceInMinutes(
							Date.now(),
							new Date(inventory.attributes.updatedAt),
						);
						if (differenceInMins <= inventoryReservationDuration) {
							if (inventory.attributes.cart_item?.attributes.product_color) {
								productOptionsInventories.colorInventory -=
									inventory.attributes.quantity;
							} else if (
								inventory.attributes.cart_item?.attributes.product_size
							) {
								productOptionsInventories.sizeInventory -=
									inventory.attributes.quantity;
							}
						}
					}
					break;
				case ProductInventoryActions.PURCHASED_BY_CUSTOMER:
				case ProductInventoryActions.SHIPPED_TO_CUSTOMER:
					if (inventory.attributes.cart_item?.attributes.product_color) {
						productOptionsInventories.colorInventory -=
							inventory.attributes.quantity;
					} else if (inventory.attributes.cart_item?.attributes.product_size) {
						productOptionsInventories.sizeInventory -=
							inventory.attributes.quantity;
					}
					break;

				default:
					break;
			}
		});
	}
	return productOptionsInventories;
};
