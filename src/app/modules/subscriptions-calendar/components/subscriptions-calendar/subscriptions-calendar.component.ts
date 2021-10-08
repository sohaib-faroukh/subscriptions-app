import { Component, OnInit } from '@angular/core';
import { IAccountVM } from 'models/account';
import { IMap } from 'models/generics/map';
import { ISubscription } from 'models/subscription';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ROUTES_MAP } from 'src/app/routes.map';
import { clone } from 'utils/clone.util';
import { formatDate, formatDateShort } from 'utils/date';
import { fullName } from 'utils/full-name';
import { arrayToMap } from 'utils/map.util';
import moment = require( 'moment' );

@Component( {
	selector: 'app-subscriptions-calendar',
	templateUrl: './subscriptions-calendar.component.html',
	styleUrls: [ './subscriptions-calendar.component.scss' ],
} )
export class SubscriptionsCalendarComponent implements OnInit {

	today = formatDateShort( moment() );
	public months: number[][] = [];
	currentMonthDays: number[] = [];
	currentMonthDaysByWeek: number[][] = [];
	routerMap = clone( ROUTES_MAP );
	fullName = fullName;

	data$ = this.service.data$;
	accounts: IMap<IAccountVM> = {};

	constructor ( private service: SubscriptionService, public auth: AuthenticationService ) {
		this.months = ( Year() )( moment().year() );
		this.currentMonthDays = this.months[ moment().month() ];

		// this.currentMonthDays

	}

	ngOnInit (): void {
		this.auth.get().pipe(
			map( data => {
				data = data.map( d => ( {
					...d,
					fullName: fullName( d.firstName, d.lastName ),
				} ) );
				return arrayToMap<IAccountVM>( data );
			} )
		).subscribe( d => this.accounts = d );
	}


	getWeek = ( index: number = 1 ) => {
		const start: number = ( index - 1 ) * 7;
		return this.currentMonthDays.slice( start, start + 7 );
	}

	getAccount = ( sub: ISubscription ): IAccountVM | null => {
		if ( !this.accounts[ sub.secondParty ] ) return null;
		let acc = this.accounts[ sub.secondParty ];
		if ( sub.secondParty === this.auth.loggedInAccount$.getValue()?.id ) acc = this.accounts[ sub.firstParty ];
		return acc;
	}


	isToday = ( day: number ): boolean => {
		if ( day < 1 ) day = 1;
		if ( day > 30 ) day = 30;
		const result = formatDateShort( moment().startOf( 'month' ).add( ( day - 1 ), 'days' ) );
		return this.today === result;
	}

	dataOf = ( day: number ): string => {
		if ( day < 1 ) day = 1;
		if ( day > 30 ) day = 30;
		return formatDate( moment().startOf( 'month' ).add( ( day - 1 ), 'days' ) );
	}


}

const month28Days = Array( 28 ).fill( 1 ).map( ( d, i ) => d + i );
const month30Days = [ ...month28Days, 29, 30 ];
const month31Days = [ ...month30Days, 31 ];

export const Year = () => ( year: number = ( new Date() ).getFullYear() ): number[][] => [
	[ ...month31Days ], // 1
	[ ...month30Days ], // 2
	[ ...month31Days ], // 3
	[ ...month30Days ], // 4
	[ ...month31Days ], // 5
	[ ...month30Days ], // 6
	[ ...month31Days ], // 7
	[ ...month31Days ], // 8
	[ ...month30Days ], // 9
	[ ...month31Days ], // 10
	[ ...month30Days ], // 11
	[ ...month31Days ], // 12
];
