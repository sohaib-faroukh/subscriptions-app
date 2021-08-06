import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

	private counterOfUsage = 0;
	constructor ( private http: HttpClient ) {
		this.counterOfUsage++;
	}
	public log = () => {
		return this.counterOfUsage?.toString();
	}
	public login = ( account: Account ): Observable<any> => {
		// TODO: implement this method
		return of( '' );
	}
	public signUp = ( user: User ): Observable<any> => {
		// TODO: implement this method
		return of( '' );
	}
}
