export enum StatusCode {
	OK = 200,
	CREATED = 201,
	Unauthorized = 401,
	Forbidden = 403,
	TooManyRequests = 429,
	InternalServerError = 500,
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
	DEEP = 'deep',
	STAR = '*',
	NONE = '',
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
