import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule( {
	declarations: [
		InputFieldComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
	],
	exports: [
		InputFieldComponent,
		ReactiveFormsModule,
		NgbDropdownModule,
	],
} )
export class SharedModule { }
