import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { InputFieldModule } from './input-field/input-field.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { SpinnerModule } from './spinner/spinner.module';
import { LoadingButtonModule } from './loading-button/loading-button.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		MaterialModule,
		InputFieldModule,
		FileUploaderModule,
		SpinnerModule,
		LoadingButtonModule,
		PipesModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		InputFieldModule,
		MaterialModule,
		FileUploaderModule,
		SpinnerModule,
		LoadingButtonModule,
		PipesModule,
	],
} )
export class SharedModule { }
