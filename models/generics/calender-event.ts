import { getCurrent } from '../../utils/date';
import { IdentityWithLogInfo, IIdentityWithLogInfo } from './IdentityWithLogInfo';

export interface ICalenderEvent extends IIdentityWithLogInfo {
	time: string;
	description?: string;
	repeat?: 'daily' | 'monthly' | 'yearly';
	count?: number;
	reminders?: IReminder[],
}

export class CalenderEvent extends IdentityWithLogInfo implements ICalenderEvent {
	time: string = getCurrent();
	description?: string = '';
	repeat?: 'daily' | 'monthly' | 'yearly' = 'monthly';
	count = 1;
	reminders?: IReminder[] = [
		{ before: 30, unit: 'minutes', type: 'email', event: this.id },
	];
}

export interface IReminder {
	event: string;
	description?: string;
	type: 'email' | 'notification';
	before: number;
	unit?: 'minutes' | 'hours' | 'days';
}


export class Reminder implements IReminder {
	event: string = '';
	description?: string = '';
	type: 'email' | 'notification' = 'email';
	before: number = 1;
	unit?: 'minutes' | 'hours' | 'days' = 'days';
}
