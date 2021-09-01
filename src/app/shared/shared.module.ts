import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { InputFieldModule } from './input-field/input-field.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FileUploaderModule } from './file-uploader/file-uploader.module';



@NgModule( {
	declarations: [
		SpinnerComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		MaterialModule,
		InputFieldModule,
		FileUploaderModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		InputFieldModule,
		SpinnerComponent,
		MaterialModule,
		FileUploaderModule,
	],
} )
export class SharedModule { }
