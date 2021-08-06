import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';
import { Account } from 'src/app/core/models/account';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

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

	get fromValue (): Account {
		return this.form?.value as Account;
	}
	private buildFrom = ( user?: Account ) => {
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
