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
	CATEGORY_LEVEL_1 = 'category_level_1',
	CATEGORY_LEVEL_2 = 'category_level_2',
	CATEGORY_LEVEL_3 = 'category_level_3',
	CATEGORY_LEVEL_3_LEVEL_2 = 'category_level_3.categories_level_2',
	CATEGORY_LEVEL_2_LEVEL_1 = 'category_level_2.categories_level_1',
	PRODUCTS_PRODUCT_COLOR = 'products.product_colors',
	PRODUCTS_PRODUCT_SIZE = 'products.product_sizes',
	PRODUCT_COLOR = 'product_color',
	PRODUCT_COLORS = 'product_colors',
	PRODUCT_SIZE = 'product_size',
	PRODUCT_SIZES = 'product_sizes',
	PRODUCT_BRAND = 'product_brand',
	PRODUCT_BRANDS = 'product_brands',
	PRODUCT_INVENTORIES = 'product_inventories',
	PRODUCT_COMPATIBILITIES = 'product_compatibilities',
	CITY = 'city',
	CITY_COUNTRY = 'city.country',
	ADDRESS = 'address',
	CART = 'cart',
	CART_ITEM = 'cart_item',
	CART_CART_ITEMS = 'cart.cart_items',
	CART_CART_ITEMS_PRODUCT_COLOR = 'cart.cart_items.product_color',
	CART_CART_ITEMS_PRODUCT_SIZE = 'cart.cart_items.product_size',
	PAYMENT_METHOD = 'order_payment_method',
	ORDER_STATUS = 'order_status',
	SHOPPING_METHOD_OPTION = 'shipping_method_option',
	NONE = '',
}

export enum SortType {
	UPDATED_AT_DESC = 'updatedAt:desc',
	UPDATED_AT_ASC = 'updatedAt:asc',
	CREATED_AT_DESC = 'createdAt:desc',
	CREATED_AT_ASC = 'createdAt:asc',
	ORDER = 'order',
	CATEROGIRES_LEVEL_2_ORDER = '[categories_level_2][order]',
	ORDER_ASC = 'order:asc',
	ORDER_DESC = 'order:desc',
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
