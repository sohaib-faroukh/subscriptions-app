import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'models/account';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTES_MAP } from 'src/app/routes.map';

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
} )
export class LoginComponent implements OnInit {

	form: FormGroup | undefined;
	constructor (
		private fb: FormBuilder,
		public auth: AuthenticationService
	) { }

	ngOnInit (): void {
		this.form = this.buildFrom();
	}
	get routerMap (): any {
		return { ...ROUTES_MAP };
	}
	get fromValue (): IAccount {
		return this.form?.value as IAccount;
	}
	private buildFrom = ( user?: IAccount ) => {
		return this.fb.group( {
			email: [ user?.email || '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.pattern( PasswordRegexMap.strong.pattern ) ] ],
		} );
	}
	onSubmit = async () => {
		try {
			await this.auth.login( this.fromValue ).toPromise();
			alert( 'submitted' );

		} catch ( error ) {
			alert( 'failed to login' );
		}
		finally {

		}
	}

}
