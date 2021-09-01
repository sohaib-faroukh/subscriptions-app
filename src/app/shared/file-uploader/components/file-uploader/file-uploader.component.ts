import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFile, IFileVM } from 'models/file';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { formatDate } from 'utils/date';

@Component( {
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: [ './file-uploader.component.scss' ],
} )
export class FileUploaderComponent implements OnInit {

	@Input() title = 'Upload a file';
	@Input() isMultiple = false;
	@Input() refPath = '';
	fileName = '';
	path = '';
	formControl = new FormControl( '', [ Validators.required ] );
	files: File[] = [];

	constructor (
		public fileService: FileService,
		public modal: ModalService,
		public alert: AlertService,
		@Inject( MAT_DIALOG_DATA ) public data: { refPath: string }
	) { }


	ngOnInit (): void {
		if ( this.data?.refPath ) this.refPath = this.data.refPath;
	}

	onSubmit = async () => {
		try {
			if ( !this.files || this.files.length === 0 ) throw new Error( 'No uploaded files' );

			if ( this.isMultiple ) await this.uploadFiles( this.files );
			else await this.uploadFile( this.files[ 0 ] );
			this.alert.success( 'File uploaded successfully...' );

		} catch ( error ) {
			this.alert.danger( error?.message || error?.error?.error || 'An error happened' );
		}
	}


	uploadFiles = async ( files: File[] ) => {

		const promises = files?.map( f => this.uploadFile( f ) );
		await Promise.all( promises );

	}

	uploadFile = async ( file: File ) => {

		const payload = {
			refPath: this.refPath,
			lastModifiedDate: formatDate( file.lastModified ),
			file,
		} as Partial<IFileVM>;

		await this.fileService.post( payload as IFileVM )
			.pipe( tap( () => this.modal.close() ) )
			.toPromise();

	}


}
