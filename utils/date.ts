import * as moment from 'moment';
import { Moment } from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const formatDate = ( date: Moment ): string => {
	return date?.format( DATE_FORMAT );
};


export const getCurrent = (): string => {
	return formatDate( moment() );
};
