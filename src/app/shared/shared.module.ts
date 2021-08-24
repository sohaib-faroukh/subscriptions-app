import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../core/material-module';



@NgModule( {
	declarations: [
		InputFieldComponent,
		SpinnerComponent,
		ModalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		MaterialModule,
	],
	exports: [
		ReactiveFormsModule,
		NgbDropdownModule,
		InputFieldComponent,
		SpinnerComponent,
	],
	entryComponents: [ ModalComponent ],
} )
export class SharedModule { }
