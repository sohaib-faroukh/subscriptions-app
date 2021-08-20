import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from 'models/account';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';
import { getItemFromStorage, saveToStorage } from '../utils/local-storage.util';

@Injectable()
export class AuthenticationService extends BaseCrudService<IAccount, HttpSearchOptions> {

	// apiUrl = 'api/accounts';
	tokenStorageKey = 'app_jwt_token';
	private _isLoggedIn$ = new BehaviorSubject<boolean>( false );
	auth$ = new BehaviorSubject<string>( '' );


	private counterOfUsage = 0;

	constructor ( public http: HttpClient ) {
		super( http );
		this.apiUrl = 'api/accounts';
		this.counterOfUsage++;
	}

	get isLoggedIn$ (): Observable<boolean> {
		return this._isLoggedIn$.asObservable();
	}

	/**
	 * 1. this check is happened once on each time on the opening of the application
	 * 2. this check should save the return status in the isLoggedIn attribute as the following:
	 * *  `true` in case success request with success code `200`
	 * *  `false` in case failed request
	 */
	public checkIfLoggedIn = async (): Promise<boolean> => {
		let result = false;
		try {
			const token = getItemFromStorage( this.tokenStorageKey );
			if ( token ) {
				result = ( await this.http.get<boolean>( `${ this.apiUrl }/is-auth` ).toPromise() ) || false;
			}
		} catch ( error ) {
			result = false;
			console.error( '**** Not logged-in' );
			console.error( error );
		} finally {
			this._isLoggedIn$.next( result );
		}
		return result;
	}
	public login = ( account: IAccount ): Observable<any> => {
		// TODO: implement this method
		return of( '' );
	}

	public signUp = ( user: IAccount ): Observable<IAccount> => {
		return this.post( user ).pipe(
			tap( _ => console.log( 'sign-up saved - 1' ) ),
			tap( newAccount => this.saveToStorage( ( newAccount as any ).data ) )
		);
	}

	private saveToStorage = ( value: IAccount ) => {
		saveToStorage( this.tokenStorageKey, value?.token || '' );
		this.auth$.next( value?.token || '' );
	}
}
