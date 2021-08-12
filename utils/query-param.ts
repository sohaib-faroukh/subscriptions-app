export class QueryParam {
	take?: number;
	start?: number;
	[ key: string ]: any;

	static getDefault = (): Required<QueryParam> => {
		const data: Required<QueryParam> = {
			take: 1000, start: 0,
		};
		return data;
	}
}
