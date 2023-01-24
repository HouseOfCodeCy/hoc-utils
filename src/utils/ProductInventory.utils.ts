import { IProductInventoryBody } from '../interfaces/product';
import { ProductInventoryActions } from '../resources/enums';
import { getProductInventoryByProduct } from '../services/ProductInventory.service';

export const calculateProductInventory = async (productId: string) => {
	let totalStock = 0;
	// retrieve the ProductInventory for the given product
	const productInventoryResponse: any = await getProductInventoryByProduct(
		productId,
	);
	if (productInventoryResponse.statusText === 'OK') {
		productInventoryResponse.data.data.map(
			(inventory: IProductInventoryBody) => {
				switch (inventory.action) {
					case ProductInventoryActions.INCREASE:
						totalStock += inventory.quantity;
						break;
					case ProductInventoryActions.ONHOLD:
						totalStock -= inventory.quantity;
						break;
					case ProductInventoryActions.DECREASE:
						totalStock -= inventory.quantity;
						break;
					case ProductInventoryActions.PURCHASED:
						totalStock += inventory.quantity;
						break;

					default:
						break;
				}
			},
		);
	}
	return totalStock;
};
