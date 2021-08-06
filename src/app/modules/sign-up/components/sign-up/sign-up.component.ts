import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';
import { User } from 'src/app/core/models/user';
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
		public auth: AuthenticationService
	) { }

	ngOnInit (): void {
		this.form = this.buildFrom();
	}

	get formValue (): User {
		return this.form?.value as User;
	}

	private buildFrom = ( user?: User ) => {
		return this.fb.group( {
			firstName: [ user?.firstName || '', [ Validators.required, Validators.maxLength( 50 ), Validators.minLength( 2 ) ] ],
			lastName: [ user?.lastName || '', [ Validators.required, Validators.maxLength( 50 ), Validators.minLength( 2 ) ] ],
			email: [ user?.email || '', [ Validators.required, Validators.email ] ],
			password: [ user?.password || '', [ Validators.required, Validators.pattern( PasswordRegexMap.strong.pattern ) ] ],
		} );
	}

	formControl = ( name: string ) => {
		return this.form?.controls[ name ];
	}

	onSubmit = async () => {
		try {
			alert( 'submitted' );
			await this.auth.signUp( this.formValue ).toPromise();
		} catch ( error ) {
			alert( 'failed to login' );
		}
		finally {

		}
	}

}
