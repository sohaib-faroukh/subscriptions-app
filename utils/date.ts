import * as moment from 'moment';
import { Moment } from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss A';
const CLEAN_DATE_FORMAT = 'YYYYMMDDHHmmssA';

export const stringToDate = ( date: string ): Moment => {
	return moment( date, DATE_FORMAT );
};

export const cleanDateFormat = ( date: Moment ): string => {
	return date.format( CLEAN_DATE_FORMAT );
};


export const formatDate = ( date: Moment ): string => {
	return date?.format( DATE_FORMAT );
};


export const getCurrent = (): string => {
	return formatDate( moment() );
};
