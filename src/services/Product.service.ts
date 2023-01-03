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

export const getProductCategories = async () => {
	try {
		const response = await http.get<any>(`product-categories`, {
			params: { populate: '*' },
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
export const getProducts = async () => {
	try {
		const response = await http.get<any>(`products`, {
			params: { populate: '*' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getProduct = async (productId: string) => {
	try {
		const response = await http.get<any>(`products/${productId}`, {
			params: { populate: '*' },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};