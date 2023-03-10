/* eslint-disable no-mixed-spaces-and-tabs */
import { differenceInMinutes } from 'date-fns';
import { IProduct, IProductInventory } from '../interfaces/product';
import { IProductOptions } from '../interfaces/productInventory';
import { ProductInventoryActions, StatusCode } from '../resources/enums';
import { getProductInventoryByAll } from '../services/ProductInventory.service';

export const calculateProductInventory = async (product: IProduct) => {
	// retrieve the ProductInventory for the given product
	const productInventoryResponse: any = await getProductInventoryByAll(product);
	if (productInventoryResponse.status === StatusCode.OK) {
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

export const renderAvailabilityLabel = (
	stock: IProductOptions | undefined,
	lowAvailabilityThreshold = 3,
	highAvailabilityThreshold = 5,
) => {
	let availability = '';
	if (stock && stock.total && stock.total > 0) {
		if (stock.total === 0) {
			availability = 'Out of Stock';
		} else if (stock.total >= highAvailabilityThreshold) {
			availability = stock.total + ' variations';
		} else if (stock.total <= lowAvailabilityThreshold) {
			availability = 'Few items left';
		} else if (stock.total > lowAvailabilityThreshold) {
			availability = 'Low in Stock';
		}
		return availability;
	} else {
		return 'Out of Stock';
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
	} else {
		productOptionsInventories = {
			total: 0,
		};
	}
	return productOptionsInventories;
};

export const constructMappedProductInventory = (
	inventory: IProductInventory,
	productOptionsInventories: IProductOptions,
	shouldAdd = true,
): IProductOptions => {
	if (inventory) {
		// if this is color STOCK_REFILL
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
					sizeInventory: inventory.attributes.product_size?.data?.id
						? [
								{
									id: inventory.attributes.product_size?.data.id
										? +inventory.attributes.product_size.data.id
										: NaN,
									quantity: shouldAdd
										? inventory.attributes.quantity
										: -inventory.attributes.quantity,
								},
						  ]
						: null,
					total: shouldAdd
						? inventory.attributes.quantity
						: -inventory.attributes.quantity,
				};
				if (productOptionsInventories.colorInventory) {
					productOptionsInventories.colorInventory.push(tempProductOption);
				} else {
					productOptionsInventories = {
						...productOptionsInventories,
						colorInventory: [tempProductOption],
					};
				}
			}
		}
		// if this is size STOCK_REFILL
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
					colorInventory: inventory.attributes.product_color?.data?.id
						? [
								{
									id: inventory.attributes.product_color?.data.id
										? +inventory.attributes.product_color.data.id
										: NaN,
									quantity: shouldAdd
										? inventory.attributes.quantity
										: -inventory.attributes.quantity,
								},
						  ]
						: null,
					total: inventory.attributes.quantity,
				};
				if (productOptionsInventories.sizeInventory) {
					productOptionsInventories.sizeInventory.push(tempProductOption);
				} else {
					productOptionsInventories = {
						...productOptionsInventories,
						sizeInventory: [tempProductOption],
					};
				}
			}
		}
		// if this RESERVER_BY_CUSTOMER or PURCHASED etc.
		if (
			!shouldAdd &&
			inventory.attributes.cart_item &&
			inventory.attributes.cart_item.data.attributes
		) {
			// find the ProductOption for the given size
			const findProductOption = productOptionsInventories.sizeInventory?.find(
				(option) =>
					`${option.id}` ===
					`${inventory.attributes.cart_item?.data.attributes.product_size?.data.id}`,
			);
			if (findProductOption) {
				// change the total quantity
				findProductOption.total -= inventory.attributes.quantity;
				// then decrease the dependency between color
				const colorDependency = findProductOption.colorInventory?.find(
					(color) =>
						`${color.id}` ===
						`${inventory.attributes.cart_item?.data.attributes.product_color?.data.id}`,
				);
				if (colorDependency) {
					colorDependency.quantity -= inventory.attributes.quantity;
				}
			} else {
				const tempProductOption = {
					id: +`${inventory.attributes.cart_item?.data.attributes.product_color?.data.id}`,
					sizeInventory: inventory.attributes.cart_item?.data.attributes
						.product_size?.data?.id
						? [
								{
									id: +`${inventory.attributes.cart_item?.data.attributes.product_size?.data.id}`,
									quantity: -inventory.attributes.quantity,
								},
						  ]
						: null,
					total: -inventory.attributes.quantity,
				};
				if (productOptionsInventories.colorInventory) {
					productOptionsInventories.colorInventory.push(tempProductOption);
				} else {
					productOptionsInventories = {
						...productOptionsInventories,
						sizeInventory: [tempProductOption],
					};
				}
			}

			// do the same for colors
			const findProductOptionColor =
				productOptionsInventories.colorInventory?.find(
					(option) =>
						`${option.id}` ===
						`${inventory.attributes.cart_item?.data.attributes.product_color?.data.id}`,
				);
			if (findProductOptionColor) {
				// change the total quantity
				findProductOptionColor.total -= inventory.attributes.quantity;
				// then decrease the dependency between color
				const colorDependency = findProductOptionColor.sizeInventory?.find(
					(color) =>
						`${color.id}` ===
						`${inventory.attributes.cart_item?.data.attributes.product_size?.data.id}`,
				);
				if (colorDependency) {
					colorDependency.quantity -= inventory.attributes.quantity;
				}
			} else {
				const tempProductOption = {
					id: +`${inventory.attributes.cart_item?.data.attributes.product_size?.data.id}`,
					colorInventory: inventory.attributes.cart_item?.data.attributes
						.product_color?.data?.id
						? [
								{
									id: +`${inventory.attributes.cart_item?.data.attributes.product_color?.data.id}`,
									quantity: -inventory.attributes.quantity,
								},
						  ]
						: null,
					total: -inventory.attributes.quantity,
				};
				if (productOptionsInventories.sizeInventory) {
					productOptionsInventories.sizeInventory.push(tempProductOption);
				} else {
					productOptionsInventories = {
						...productOptionsInventories,
						sizeInventory: [tempProductOption],
					};
				}
			}
		}
		if (productOptionsInventories.total)
			shouldAdd
				? (productOptionsInventories.total += inventory.attributes.quantity)
				: (productOptionsInventories.total -= inventory.attributes.quantity);
		else {
			shouldAdd
				? (productOptionsInventories.total = inventory.attributes.quantity)
				: (productOptionsInventories.total = -inventory.attributes.quantity);
		}
	}
	return productOptionsInventories;
};
