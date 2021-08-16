import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAccount } from 'models/account';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component( {
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.scss' ],
} )
export class SignUpComponent implements OnInit {

	form: FormGroup | undefined;
	passwordFormControl: FormControl = new FormControl( '', [ Validators.required ] );
	constructor (
		private fb: FormBuilder,
		public auth: AuthenticationService,
		public router: Router,
	) { }

	ngOnInit (): void {
		this.form = this.buildFrom();
	}

	get formValue (): IAccount {
		return this.form?.value as IAccount;
	}

	private buildFrom = ( user?: IAccount ) => {
		return this.fb.group( {
			firstName: [ user?.firstName || '', [ Validators.required, Validators.maxLength( 50 ), Validators.minLength( 2 ) ] ],
			lastName: [ user?.lastName || '', [ Validators.required, Validators.maxLength( 50 ), Validators.minLength( 2 ) ] ],
			email: [ user?.email || '', [ Validators.required, Validators.email ] ],
			password: [ user?.password || '', [ Validators.required, Validators.pattern( PasswordRegexMap.strong.pattern ) ] ],
			type: [ 'personal', [ Validators.required ] ],
		} );
	}

	formControl = ( name: string ) => {
		return this.form?.controls[ name ];
	}

	onSubmit = async () => {
		try {
			const toSubmitValue = { ...this.formValue } as IAccount;
			toSubmitValue.type ||= 'personal';

			await ( this.auth.signUp( toSubmitValue ).toPromise() );

			this.router.navigate( [ '/home' ] );
			alert( 'login successfully' );


		} catch ( error ) {
			alert( 'failed to login' );
		}
		finally {

		}
	}

}
