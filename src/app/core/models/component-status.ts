export enum Status {
	initial = 0,
	starting = 1,
	loading = 2,
	done = 3,
	submitting = 4,
}
export interface IComponentStatus {
	status: Status;
}
