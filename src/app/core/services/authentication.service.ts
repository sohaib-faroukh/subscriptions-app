import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from 'models/account';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';
import { saveToStorage } from '../utils/local-storage.util';

@Injectable()
export class AuthenticationService extends BaseCrudService<IAccount, HttpSearchOptions> {

	apiUrl = 'http://localhost:4500/api/accounts';
	tokenStorageKey = 'app_jwt_token';
	auth$ = new BehaviorSubject<string>( '' );


	private counterOfUsage = 0;

	constructor ( public http: HttpClient ) {
		super( http );
		this.counterOfUsage++;
	}
	public log = () => {
		return this.counterOfUsage?.toString();
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
