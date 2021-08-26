import { Injectable } from '@angular/core';
import { ProgressBar } from '../models/progress-bar';

@Injectable()
export class LoadingBarService extends ProgressBar {
	constructor () {
		super();
	}

}
