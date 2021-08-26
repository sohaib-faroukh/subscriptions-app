
type IProgressBarStatus = number | 'initial' | 'done';

export interface IProgressBar {
	interval: number;
	status: IProgressBarStatus;
	start: () => void;
	reset: () => void;
	complete: () => void;
	stop: () => void;
}

export class ProgressBar implements IProgressBar {
	public interval: number = 500;
	public status: IProgressBarStatus = 'initial';

	public start = (): void => {
		this.status = 1;
	}

	public reset = (): void => {
		this.status = 0;
	}

	public complete = (): void => {
		this.status = 'done';
	}

	public stop = (): void => {
		this.status = 'initial';
	}
}
