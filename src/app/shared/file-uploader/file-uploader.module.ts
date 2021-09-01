import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { InputFieldModule } from '../input-field/input-field.module';
import { MaterialModule } from '../material.module';



@NgModule( {
	declarations: [ FileUploaderComponent, FilesListComponent ],
	imports: [
		CommonModule,
		MaterialModule,
		InputFieldModule,
	],
	exports: [ FilesListComponent, FileUploaderComponent ],

} )
export class FileUploaderModule { }
