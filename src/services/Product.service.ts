import { IProductInventoryBody } from '../interfaces/product';
import { PopulateType } from '../resources/enums';
import { http } from './common/Http.service';

export const getProductParentCategories = async () => {
	try {
		const response = await http.get<any>(`product-category-parents`, {
			// params: { populate: "*" },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getCategoriesByParentCategoryId = async (id: string) => {
	try {
		const response = await http.get<any>(
			`product-categories?populate=deep&filters[product_category_parent][id][$eq]=${id}`,
			{
				// params: { populate: "*" },
			},
		);
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProductCategories = async (
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`product-categories`, {
			params: { populate: populateType },
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
export const getProducts = async (populateType = PopulateType.STAR) => {
	try {
		const response = await http.get<any>(`products`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProduct = async (
	productId: string,
	populateType = PopulateType.DEEP,
) => {
	try {
		const response = await http.get<any>(`products/${productId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getFeaturedProducts = async (populateType = PopulateType.DEEP) => {
	try {
		const response = await http.get<any>(`featured-products`, {
			params: { populate: populateType },
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

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
