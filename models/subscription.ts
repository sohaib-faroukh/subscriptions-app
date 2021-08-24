
import { CalenderEvent, ICalenderEvent } from './generics/calender-event';

export interface ISubscription extends ICalenderEvent {
	firstParty: string;
	secondParty: string;
	icon?: string;
}

export class Subscription extends CalenderEvent implements ISubscription {
	firstParty: string = '';
	secondParty: string = '';
	icon: string = '';
}


export interface ISubscriptionVM extends Partial<ISubscription> {
	day?: string;
	month?: string;
	icon?: string;
}

