import { IProductInventory } from '../interfaces/product';
import { ProductInventoryActions } from '../resources/enums';
import { getProductInventoryByProduct } from '../services/ProductInventory.service';

export const calculateProductInventory = async (productId: string) => {
	let totalStock = 0;
	// retrieve the ProductInventory for the given product
	const productInventoryResponse: any = await getProductInventoryByProduct(
		productId,
	);
	if (productInventoryResponse.statusText === 'OK') {
		const productInventories = productInventoryResponse.data?.data;
		productInventories.length > 0 &&
			productInventories.map((inventory: IProductInventory) => {
				switch (inventory.attributes.action) {
					case ProductInventoryActions.INCREASE:
						totalStock += inventory.attributes.quantity;
						break;
					case ProductInventoryActions.ONHOLD:
						totalStock -= inventory.attributes.quantity;
						break;
					case ProductInventoryActions.DECREASE:
						totalStock -= inventory.attributes.quantity;
						break;
					case ProductInventoryActions.PURCHASED:
						totalStock += inventory.attributes.quantity;
						break;

					default:
						break;
				}
			});
	}
	return totalStock;
};
