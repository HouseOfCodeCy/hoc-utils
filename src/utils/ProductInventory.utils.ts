/* eslint-disable no-mixed-spaces-and-tabs */
import { differenceInMinutes } from 'date-fns';
import { IProduct, IProductInventory } from '../interfaces/product';
import { IProductOptions } from '../interfaces/productInventory';
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
	let productOptionsInventories: any = {};
	if (productInventories.length > 0) {
		productInventories.map((inventory: IProductInventory) => {
			switch (inventory.attributes.action) {
				case ProductInventoryActions.STOCK_REFILL:
				case ProductInventoryActions.RETURNED_BY_CUSTOMER:
					productOptionsInventories = constructMappedProductInventory(
						inventory,
						productOptionsInventories,
						true,
					);
					break;
				case ProductInventoryActions.RESERVED_BY_CUSTOMER:
					if (inventory.attributes.updatedAt) {
						const differenceInMins = differenceInMinutes(
							Date.now(),
							new Date(inventory.attributes.updatedAt),
						);
						if (differenceInMins <= inventoryReservationDuration) {
							productOptionsInventories = constructMappedProductInventory(
								inventory,
								productOptionsInventories,
								false,
							);
						}
					}
					break;
				case ProductInventoryActions.PURCHASED_BY_CUSTOMER:
				case ProductInventoryActions.SHIPPED_TO_CUSTOMER:
					productOptionsInventories = constructMappedProductInventory(
						inventory,
						productOptionsInventories,
						false,
					);
					break;

				default:
					break;
			}
		});
	}
	console.log(productOptionsInventories);

	return productOptionsInventories;
};

export const constructMappedProductInventory = (
	inventory: IProductInventory,
	productOptionsInventories: IProductOptions,
	shouldAdd = true,
) => {
	if (inventory) {
		// if this is color stock
		if (
			inventory.attributes.product_color &&
			inventory.attributes.product_color.data &&
			inventory.attributes.product_color.data.id
		) {
			// find the ProductOption for the given color
			const findProductOption = productOptionsInventories.colorInventory?.find(
				(option) =>
					`${option.id}` === `${inventory.attributes.product_color?.data.id}`,
			);
			// if this color exists in the object
			if (findProductOption && findProductOption?.sizeInventory) {
				// add to the found object more size inventory relations
				findProductOption.sizeInventory.push({
					id: inventory.attributes.product_size?.data.id
						? +inventory.attributes.product_size.data.id
						: NaN,
					quantity: shouldAdd
						? inventory.attributes.quantity
						: -inventory.attributes.quantity,
				});
				shouldAdd
					? (findProductOption.total += inventory.attributes.quantity)
					: (findProductOption.total -= inventory.attributes.quantity);
			} else {
				const tempProductOption = {
					id: +inventory.attributes.product_color?.data.id,
					sizeInventory: [
						{
							id: inventory.attributes.product_size?.data.id
								? +inventory.attributes.product_size.data.id
								: NaN,
							quantity: shouldAdd
								? inventory.attributes.quantity
								: -inventory.attributes.quantity,
						},
					],
					total: shouldAdd
						? inventory.attributes.quantity
						: -inventory.attributes.quantity,
				};
				productOptionsInventories.colorInventory
					? productOptionsInventories.colorInventory.push(tempProductOption)
					: (productOptionsInventories = {
							...productOptionsInventories,
							colorInventory: [tempProductOption],
					  });
			}
		}
		// if this is size stock
		if (
			inventory.attributes.product_size &&
			inventory.attributes.product_size.data &&
			inventory.attributes.product_size.data.id
		) {
			// find the ProductOption for the given size
			const findProductOption = productOptionsInventories.sizeInventory?.find(
				(option) =>
					`${option.id}` === `${inventory.attributes.product_size?.data.id}`,
			);
			// if this product exists in the object
			if (findProductOption && findProductOption?.colorInventory) {
				// add to the found object more color inventory relations
				findProductOption.colorInventory.push({
					id: inventory.attributes.product_color?.data.id
						? +inventory.attributes.product_color.data.id
						: NaN,
					quantity: shouldAdd
						? inventory.attributes.quantity
						: -inventory.attributes.quantity,
				});
				shouldAdd
					? (findProductOption.total += inventory.attributes.quantity)
					: (findProductOption.total -= inventory.attributes.quantity);
			} else {
				const tempProductOption = {
					id: +inventory.attributes.product_size?.data.id,
					colorInventory: [
						{
							id: inventory.attributes.product_color?.data.id
								? +inventory.attributes.product_color.data.id
								: NaN,
							quantity: shouldAdd
								? inventory.attributes.quantity
								: -inventory.attributes.quantity,
						},
					],
					total: inventory.attributes.quantity,
				};
				productOptionsInventories.sizeInventory
					? productOptionsInventories.sizeInventory.push(tempProductOption)
					: (productOptionsInventories = {
							...productOptionsInventories,
							sizeInventory: [tempProductOption],
					  });
			}
		}
	}
	return productOptionsInventories;
};
