import { FormGroup } from '@angular/forms';

export interface IFormBuilder<T = any> {
	myFormGroup: FormGroup | null;
	build: ( data?: T ) => FormGroup;
	onSubmit: () => any
}
