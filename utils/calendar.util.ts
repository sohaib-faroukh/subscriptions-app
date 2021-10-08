import { Moment } from 'moment';
import moment = require( 'moment' );


export interface Week {
	week: number;
	days: Moment[];
}


export class Calendar {

	private moment = moment;

	static buildWeeks = (): Week[] => {

		const startWeek = moment().startOf( 'month' ).week();
		const endWeek = moment().endOf( 'month' ).week();


		const calendar: Week[] = [];
		for ( let week = startWeek; week < endWeek; week++ ) {
			calendar.push( {
				week,
				days: Array( 7 ).fill( 0 ).map( ( n, i ) => moment().week( week ).startOf( 'week' ).clone().add( n + i, 'day' ) ),
			} );
		}

		return calendar;
	}


}
