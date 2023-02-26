export enum StatusCode {
	OK = 200,
	CREATED = 201,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	TooManyRequests = 429,
	InternalServerError = 500,
	BadGateway = 502,
	ServiceNotAvailable = 503,
}

export enum CartAction {
	ADD = 'ADD',
	MODIFY = 'MODIFY',
	DELETE = 'DELETE',
	CANCEL = 'CANCEL',
}

export enum CartStatus {
	INPROGRESS = 'INPROGRESS',
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

export enum PopulateType {
	PRODUCT = 'product',
	PRODUCTS = 'products',
	USER = 'user',
	DEEP = 'deep',
	STAR = '*',
	CATEGORIES_LEVEL_1 = 'categories_level_1',
	CATEGORIES_LEVEL_2 = 'categories_level_2',
	CATEGORIES_LEVEL_2_LEVEL_3 = 'categories_level_2.categories_level_3',
	CATEGORIES_LEVEL_3 = 'categories_level_3',
	PRODUCTS_PRODUCT_COLOR = 'products.product_colors',
	PRODUCTS_PRODUCT_SIZE = 'products.product_sizes',
	PRODUCT_COLOR = 'product_color',
	PRODUCT_SIZE = 'product_size',
	PRODUCT_BRAND = 'product_brand',
	PRODUCT_INVENTORIES = 'product_inventories',
	PRODUCT_COMPATIBILITIES = 'product_compatibilities',
	CITY = 'city',
	CITY_COUNTRY = 'city.country',
	NONE = '',
}

export enum SortType {
	UPDATED_AT_DESC = 'updatedAt:desc',
	UPDATED_AT_ASC = 'updatedAt:asc',
	CREATED_AT_DESC = 'createdAt:desc',
	CREATED_AT_ASC = 'createdAt:asc',
}

export enum DateTypes {
	DATE = 'dd/MM/yyyy',
	DATE1 = 'dd.MM.yyyy',
	DATETIME = 'dd/MM/yyyy HH:mm',
	DATETIME1 = 'dd.MM.yyyy HH:mm',
}

export enum ProductInventoryActions {
	RESERVED_BY_CUSTOMER = 'RESERVED_BY_CUSTOMER',
	PURCHASED_BY_CUSTOMER = 'PURCHASED_BY_CUSTOMER',
	RETURNED_BY_CUSTOMER = 'RETURNED_BY_CUSTOMER',
	SHIPPED_TO_CUSTOMER = 'SHIPPED_TO_CUSTOMER',
	STOCK_REFILL = 'STOCK_REFILL',
}
