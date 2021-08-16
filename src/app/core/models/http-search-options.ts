export interface HttpSearchOptions {
	start?: number;
	take?: number;
	[ key: string ]: string | string[] | number | undefined;
}
