import { Pipe, PipeTransform } from '@angular/core';
import { ISubscription } from 'models/subscription';
import { stringToDate } from 'utils/date';

@Pipe( {
	name: 'subscriptionsOfDay', pure: true,
} )
export class SubscriptionsOfDayPipe implements PipeTransform {

	transform ( data: ISubscription[] | null | undefined, day: string ): ISubscription[] {
		if ( !data ) return [];
		return ( data.filter( s => s.time === day ) || [] ) as ISubscription[];
	}

}
