export interface IResponseInterfaceFull {
	data: IResponse;
	headers: any;
	status: number;
	statusText: string;
}

export interface IResponse {
	data: IDataResponse[];
	meta: IMetaResponse;
}

export interface IMetaResponse {
	pagination: {
		page: number;
		pageCount: number;
		pageSize: number;
		total: number;
	};
}

export interface IDataResponse {
	attributes: never;
	id: number;
}

export type IResponseSchema = {
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	localizations: {
		data: any[];
	};
};
