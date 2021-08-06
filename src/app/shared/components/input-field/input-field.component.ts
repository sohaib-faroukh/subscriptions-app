import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { PasswordRegexMap } from 'src/app/core/configurations/password-regexps';

type FieldTypes = 'text' | 'email' | 'number' | 'password';
const ErrorMessagesMap: { [ key: string ]: string } = {
	required: 'required value',
	pattern: 'invalid value',
	email: 'email is invalid',
	maxlength: 'the value exceeded the maximum allowed number of characters',
	minlength: 'the value length is under the minimum limit',
	max: 'the value is larger than than allowed number',
	min: 'the value length is smaller than the tha allowed number',
	notMatchedPassword: 'the password is not matched',
};
@Component( {
	selector: 'app-input-field',
	templateUrl: './input-field.component.html',
	styleUrls: [ './input-field.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef( () => InputFieldComponent ),
		},
	],
} )
export class InputFieldComponent implements OnInit, ControlValueAccessor {

	@Input() isWithLabel = false;
	@Input() placeholder = '';
	@Input() type: FieldTypes = 'text';
	@Input() label = '';
	@Input() id = '';
	@Input() name = '';
	@Input() isWithErrorMessage = true;
	@Input() formControl: FormControl | undefined;
	@Input() formControlName: string | undefined;
	@Input() errors: ValidationErrors | undefined | null;
	isPassword = false;
	val: any;
	disabled: boolean | undefined;

	constructor ( private controlContainer: ControlContainer ) { }
	ngOnInit (): void {
		this.isPassword = ( this.type === 'password' );
	}

	get control (): FormControl {
		return this.formControl || this.controlContainer?.control?.get( this.formControlName || '' ) as FormControl;
	}
	get fieldName (): string {
		return this.name || this.label || '';
	}
	get fieldErrors (): ValidationErrors | undefined {
		let result: ValidationErrors = {};
		if ( this.control?.errors ) result = { ...this.control.errors };
		if ( this.errors ) result = { ...result, ...this.errors };
		return Object.keys( result )?.length > 0 ? result : undefined;
	}
	set value ( val: any ) {  // this value is updated by programmatic changes
		if ( val !== undefined && this.val !== val ) {
			this.val = val;
			this.onChange( val );
			this.onTouch( val );
		}
	}

	togglePassword = () => {
		this.type = this.type === 'password' ? 'text' : 'password';
	}

	getErrorMessage = (): string => {

		const errorsArray: string[] = [];
		const wildcardMessage = 'invalid value';
		const errorMessagesMap = Object.assign( {}, ErrorMessagesMap );

		if ( !this.fieldErrors ) return '';

		Object.keys( this.fieldErrors )?.forEach( key => {
			if ( key === 'pattern' && this.isPassword ) {

				errorsArray.push(
					PasswordRegexMap?.strong?.message
						? ( PasswordRegexMap?.strong?.message )
						: ( errorMessagesMap[ key ] ? errorMessagesMap[ key ] : wildcardMessage )
				);
			}
			else {
				errorsArray.push( errorMessagesMap[ key ] ? errorMessagesMap[ key ] : wildcardMessage );
			}
		} );
		return ( errorsArray || [] )?.map( e => ( e?.toString() ) )?.join( ', ' ) || '';
	}
	onChange = ( value: any ) => { };
	onTouch = ( value: any ) => { };
	writeValue ( value: any ): void {
		this.value = value;
		this.control.setValue( value );
	}
	registerOnChange ( fn: any ): void {
		this.onChange = fn;
	}
	registerOnTouched ( fn: any ): void {
		this.onTouch = fn;
	}


}
