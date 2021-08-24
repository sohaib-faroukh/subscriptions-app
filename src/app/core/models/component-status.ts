export enum Status {
	initial = 0,
	starting = 1,
	loading = 2,
	done = 3,
}
export interface IComponentStatus {
	status: Status;
}
