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

export enum DateTypes {
	DATE = 'dd/MM/YYYY',
	DATE1 = 'dd.MM.YYYY',
	DATETIME = 'dd/MM/YYYY HH:mm',
	DATETIME1 = 'd.MM.YYYY HH:mm',
}
