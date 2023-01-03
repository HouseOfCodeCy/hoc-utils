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
}
