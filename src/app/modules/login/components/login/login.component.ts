import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAccount } from 'models/account';
import { Subscription } from 'rxjs';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTES_MAP } from 'src/app/routes.map';

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
} )
export class LoginComponent implements OnInit, OnDestroy {

	form: FormGroup | undefined;
	subs: Subscription = new Subscription();
	constructor (
		private fb: FormBuilder,
		public auth: AuthenticationService,
		public router: Router,
	) { }

	ngOnInit (): void {
		this.subs.add( this.auth.isLoggedIn$.subscribe( res => {
			if ( res ) this.router.navigate( [ '/' + this.routerMap?.home || '/' ] );
		} ) );
		this.form = this.buildFrom();
	}

	ngOnDestroy (): void {

		this.subs.unsubscribe();
	}

	get routerMap (): any {
		return { ...ROUTES_MAP };
	}
	get fromValue (): Partial<IAccount> {
		return this.form?.value as Partial<IAccount>;
	}
	private buildFrom = ( user?: IAccount ) => {
		return this.fb.group( {
			email: [ user?.email || '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.pattern( PasswordRegexMap.strong.pattern ) ] ],
		} );
	}
	onSubmit = async () => {
		try {
			const object = this.fromValue;
			if ( !object?.email || !object.password ) throw new Error( 'Please enter email and password' );
			await this.auth.login( this.fromValue ).toPromise();
			alert( 'submitted' );

		} catch ( error ) {
			alert( 'failed to login' );
		}
		finally {

		}
	}

}
