import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IAccount } from 'models/account';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ROUTES_MAP } from 'src/app/routes.map';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';
import { deleteFromStorage, getItemFromStorage, saveToStorage } from '../utils/local-storage.util';

@Injectable()
export class AuthenticationService extends BaseCrudService<IAccount, HttpSearchOptions> {

	// apiUrl = 'api/accounts';
	private tokenStorageKey = environment.JWT_STORAGE_KEY;
	private counterOfUsage = 0;

	public auth$ = new BehaviorSubject<string>( '' );
	public isLoggedIn$ = new BehaviorSubject<boolean>( false );


	constructor ( public http: HttpClient, public router: Router ) {
		super( http );
		this.apiUrl = 'api/accounts';
		this.counterOfUsage++;

	}

	get isLoggedIn (): boolean {
		return this.isLoggedIn$.getValue() || false;
	}


	/**
	 * 1. this check is happened once on each time on the opening of the application
	 * 2. this check should save the return status in the isLoggedIn attribute as the following:
	 * *  `true` in case success request with success code `200`
	 * *  `false` in case failed request
	 */
	public isAuth = async (): Promise<boolean> => {
		let result = false;
		try {
			const myToken = getItemFromStorage( this.tokenStorageKey );
			if ( myToken ) {
				result = ( await this.http.get<boolean>( `${ this.apiUrl }/is-auth` ).toPromise() ) || false;
			}
			if ( !result ) throw new Error( 'No auth result' );

		} catch ( error ) {

			result = false;
			console.error( '**** Not logged-in' );
			console.error( error );

		} finally {
			this.isLoggedIn$.next( result );
		}
		return result;
	}


	public login = ( account: Partial<IAccount> ): Observable<any> => {
		deleteFromStorage( this.tokenStorageKey );
		return this.http.post<IAccount>( `${ this.apiUrl }/login`, account )
			.pipe(
				tap( loggedInAccount => {
					this.saveToStorage( loggedInAccount );
					this.isLoggedIn$.next( true );
					this.router.navigate( [ '/' + ROUTES_MAP.home ] );
				} )
			);
	}

	public signUp = ( user: IAccount ): Observable<IAccount> => {
		this.deleteFromStorage();
		return this.post( user ).pipe(
			tap( _ => console.log( 'sign-up saved - 1' ) ),
			tap( _ => this.isLoggedIn$.next( true ) ),
			tap( newAccount => this.saveToStorage( ( newAccount as any ) ) ),
		);
	}

	public logout = (): void => {
		this.deleteFromStorage();
		this.isLoggedIn$.next( false );
		this.router.navigate( [ '/' + ROUTES_MAP.login ] );
	}


	private saveToStorage = ( value: IAccount ) => {
		saveToStorage( this.tokenStorageKey, value?.token || '' );
		this.auth$.next( value?.token || '' );
	}

	private deleteFromStorage = () => {
		deleteFromStorage( this.tokenStorageKey );
		this.auth$.next( '' );
	}
}
