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
	DATE = 'dd/MM/yyyy',
	DATE1 = 'dd.MM.yyyy',
	DATETIME = 'dd/MM/yyyy HH:mm',
	DATETIME1 = 'd.MM.yyyy HH:mm',
}
