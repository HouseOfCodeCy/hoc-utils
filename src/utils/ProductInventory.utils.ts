import { IProductInventoryBody } from '../interfaces/product';
import { ProductInventoryActions } from '../resources/enums';
import { getProductInventoryByProduct } from '../services/ProductInventory.service';

export const calculateProductStock = async (productId: string) => {
	let totalStock = 0;
	// retrieve the ProductInventory for the given product
	await getProductInventoryByProduct(productId).then(async (res: any) => {
		if (res?.statusText === 'OK') {
			const productInventories: IProductInventoryBody[] = res.data.data;
			productInventories.map((inventory) => {
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
			});
		} else {
			totalStock = 999;
		}
	});
	return totalStock;
};
