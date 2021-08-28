
import { stringToDate } from 'utils/date';
import { fullName } from 'utils/full-name';
import { IAccount } from './account';
import { CalenderEvent, ICalenderEvent } from './generics/calender-event';
import { IMap } from './generics/map';

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
	firstPartyName?: string;
	secondPartyName?: string;
	day?: string;
	month?: string;
	icon?: string;
}

export const getSubscriptionVM = ( item: ISubscription, accounts?: IMap<IAccount> ): ISubscriptionVM => {
	const _accounts = accounts || {};
	return ( {
		...item,
		firstPartyName: fullName( _accounts[ item.firstParty ]?.firstName, _accounts[ item.secondParty ]?.lastName ) || '',
		secondPartyName: fullName( _accounts[ item.secondParty ]?.firstName, _accounts[ item.secondParty ]?.lastName ) || '',
		day: stringToDate( item.time ).format( 'DD' ) || '',
		month: stringToDate( item.time ).format( 'MMM' ) || '',
		icon: item.icon || 'fa fa-users',
	} as ISubscriptionVM );
};
