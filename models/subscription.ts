
import { CalenderEvent, ICalenderEvent } from './generics/calender-event';

export interface ISubscription extends ICalenderEvent {
	firstParty: string;
	secondParty: string;
}

export class Subscription extends CalenderEvent {
	firstParty: string = '';
	secondParty: string = '';
}
