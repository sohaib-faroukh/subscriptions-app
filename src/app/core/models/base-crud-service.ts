import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { errorCatcher } from 'utils/error-catcher.util';
import { HttpSearchOptions } from './http-search-options';

/**
 * Include all crud functionalities, TO use it, you should extend it and call its constructor
 * and you need to set apiUrl value before constructor declaration
 */
export abstract class BaseCrudService<T, Options extends HttpSearchOptions, IdKey = 'id'> {
	protected apiUrl = '';
	idKey = 'id';
	public data$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>( [] );

	constructor ( public http: HttpClient ) {
		// this.fetch();
	}

	protected fetch = ( configs?: Options ): Observable<T[]> => {
		return this.http.get<T[]>(
			this.apiUrl,
			{ params: { ...configs } as any } ).
			pipe(
				map( data => ( data || [] ) ),
				// tap( data => this.data$.next( data ) ),
				tap( e => this.sync( e ) ),
				catchError( errorCatcher )
			);
	}

	protected sync = ( data: T[], isRemove: boolean = false ) => {
		console.log( '**** syncing...' );
		const currentData = this.data$.getValue() || [];
		for ( const toSyncItem of data ) {
			const ix = currentData?.findIndex( e => ( e as any )[ this.idKey ] === ( toSyncItem as any )[ this.idKey ] );
			if ( ix >= 0 ) {
				if ( isRemove === true ) currentData?.splice( ix, 1 );
				else currentData[ ix ] = { ...toSyncItem };
			}
			else {
				if ( !isRemove ) currentData.push( toSyncItem );
			}
		}
	}

	public get = ( options?: Options ): Observable<T[]> => {
		if ( !options && this.data$.getValue()?.length > 0 ) return this.data$;
		else return this.fetch( options );
	}

	public post = ( payload: T ): Observable<T> => {
		if ( !payload ) throw new Error( 'The payload of http post is not provided' );
		return this.http.post<T>( this.apiUrl, payload ).pipe(
			tap( _ => console.log( 'sign-up saved - 0' ) ),
			tap( e => this.sync( [ e ] ) ),
			catchError( errorCatcher )
		);
	}

	public put = ( id: string | number, payload: T ): Observable<T> => {
		if ( !payload ) throw new Error( 'The payload of http post is not provided' );
		if ( !id ) throw new Error( 'The id of http request is not provided' );
		return this.http.put<T>( `${ this.apiUrl }/${ id }`, payload ).pipe(
			tap( e => this.sync( [ e ] ) ),
			catchError( errorCatcher )
		);
	}

	public delete = ( id: string | number ): Observable<T> => {
		if ( !id ) throw new Error( 'The id of http request is not provided' );
		return this.http.delete<T>( `${ this.apiUrl }/${ id }` ).pipe(
			tap( e => this.sync( [ e ], true ) ),
			catchError( errorCatcher )
		);
	}


}

