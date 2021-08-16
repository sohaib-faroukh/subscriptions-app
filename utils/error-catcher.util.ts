import { Observable } from 'rxjs';

export const errorCatcher = <T> ( err: any, caught: Observable<T> ) => {
	console.log( 'HTTP ERROR: ' + JSON.stringify( err ) );
	throw err;
};
