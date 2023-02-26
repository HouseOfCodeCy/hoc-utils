import qs from 'qs';
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

export const getProductInventoryByProduct = async (
	productId: string,
	populateType: PopulateType[] = [
		PopulateType.CART_ITEM,
		PopulateType.PRODUCT_COLOR,
		PopulateType.PRODUCT_SIZE,
	],
) => {
	try {
		const query = qs.stringify(
			{
				sort: ['id:asc'],
				populate: populateType,
				filters: {
					$or: [
						{
							cart_item: {
								product: {
									id: {
										$eq: productId,
									},
								},
							},
						},
						{
							product: {
								id: {
									$eq: productId,
								},
							},
						},
					],
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`product-inventories?${query}`);

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProductInventoryByAll = async (
	product: IProduct,
	populateType: PopulateType[] = [
		PopulateType.CART_ITEM,
		PopulateType.PRODUCT_COLOR,
		PopulateType.PRODUCT_SIZE,
	],
) => {
	try {
		// get unique colors of given product
		const productProductColorIds = product.attributes.product_colors?.data.map(
			(color) => color.id,
		);
		// get unique sizes of given product
		const productProductSizeIds = product.attributes.product_sizes?.data.map(
			(size) => size.id,
		);
		const query = qs.stringify(
			{
				sort: ['id:asc'],
				populate: populateType,
				filters: {
					$or: [
						{
							cart_item: {
								product: {
									id: {
										$eq: product.id,
									},
								},
							},
						},
						{
							cart_item: {
								product_color: {
									id: {
										$in: productProductColorIds,
									},
								},
							},
						},
						{
							cart_item: {
								product_size: {
									id: {
										$in: productProductSizeIds,
									},
								},
							},
						},
						{
							product: {
								id: {
									$eq: product.id,
								},
							},
						},
						{
							product_color: {
								id: {
									$in: productProductColorIds,
								},
							},
						},
						{
							product_size: {
								id: {
									$in: productProductSizeIds,
								},
							},
						},
					],
				},
			},
			{
				encodeValuesOnly: true, // prettify URL
			},
		);
		const response = await http.get<any>(`product-inventories?${query}`);

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
