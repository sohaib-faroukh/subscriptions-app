import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../core/material.module';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule( {
	declarations: [
		InputFieldComponent,
		SpinnerComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		MaterialModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		InputFieldComponent,
		SpinnerComponent,
		MaterialModule,
	],
} )
export class SharedModule { }
