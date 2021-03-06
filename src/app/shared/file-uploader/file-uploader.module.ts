import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FilesListComponent } from './components/files-list/files-list.component';
import { InputFieldModule } from '../input-field/input-field.module';
import { MaterialModule } from '../material.module';
import { LoadingButtonModule } from '../loading-button/loading-button.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule( {
	declarations: [ FileUploaderComponent, FilesListComponent ],
	imports: [
		CommonModule,
		MaterialModule,
		PipesModule,
		InputFieldModule,
		LoadingButtonModule,
	],
	exports: [ FilesListComponent, FileUploaderComponent ],

} )
export class FileUploaderModule { }
