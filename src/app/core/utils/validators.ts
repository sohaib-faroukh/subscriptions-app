
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { formatDate, formatDateShort } from 'utils/date';

export class CustomValidators {

	/**
	 * validator for from control of date to validate date value in custom range
	 * @param fromDate min date
	 * @param toDate max date (optional)
	 */
	static dateRangeValidator = ( fromDate: string, toDate?: string ): ValidatorFn => ( control: AbstractControl ): ValidationErrors | null => {
		if ( !control?.value ) return null;

		const value = formatDate( control.value as Date );

		// valid state
		if ( ( value >= fromDate && ( toDate && value <= toDate ) ) || ( value >= fromDate && !toDate ) ) return null;

		const errors: ValidationErrors = {};




		if ( value < fromDate ) errors.smallerThanMinDate = { min: formatDateShort( fromDate ), actual: formatDateShort( value ) };
		if ( toDate && value > toDate ) errors.largerThanMaxDate = { max: formatDateShort( toDate ), actual: formatDateShort( value ) };



		return errors;
	}

}
