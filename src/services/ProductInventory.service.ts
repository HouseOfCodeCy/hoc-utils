import { IProduct, IProductInventoryBody } from '../interfaces/product';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getProductInventories = async (
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`product-inventories`, {
			params: { populate: populateType },
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProductInventory = async (
	productInventoryId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(
			`product-inventories/${productInventoryId}`,
			{
				params: { populate: populateType },
			},
		);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProductInventoryByProduct = async (productId: string) => {
	try {
		const response = await http.get<any>(
			`product-inventories?filters[$or][0][cart_item][product][id][$eq]=${productId}&filters[$or][1][product][id][$eq]=${productId}`,
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProductInventoryByAll = async (product: IProduct) => {
	try {
		// get unique colors of given product
		const productProductColorIds = product.attributes.product_colors?.data.map(
			(color) => color.id,
		);
		// get unique sizes of given product
		const productProductSizeIds = product.attributes.product_sizes?.data.map(
			(size) => size.id,
		);
		const response = await http.get<any>(
			`product-inventories?filters[$or][0][cart_item][product][id][$eq]=${product.id}&filters[$or][1][product][id][$eq]=${product.id}&filters[$or][2][product_color][id][$in]=${productProductColorIds}&filters[$or][0][product_size][id][$in]=${productProductSizeIds}`,
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const createProductInventory = async (data: IProductInventoryBody) => {
	try {
		const response = await http.post<any>('product-inventories', {
			data,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateProductInventory = async (
	productInventoryId: string,
	data: IProductInventoryBody,
) => {
	try {
		const response = await http.put<any>(
			`product-inventories/${productInventoryId}`,
			{
				data,
			},
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const deleteProductInventory = async (productInventoryId: string) => {
	try {
		const response = await http.delete<any>(
			`product-inventories/${productInventoryId}`,
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
