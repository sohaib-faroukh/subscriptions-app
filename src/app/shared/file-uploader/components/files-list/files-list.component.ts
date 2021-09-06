import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { IComponentStatus, Status } from 'src/app/core/models/component-status';
import { AlertService } from 'src/app/core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

interface StyleMap { [ key: string ]: string }

@Component( {
	selector: 'app-files-list',
	templateUrl: './files-list.component.html',
	styleUrls: [ './files-list.component.scss' ],
} )
export class FilesListComponent implements OnInit, IComponentStatus {
	defaultStyle: StyleMap = { 'min-width': '100%', height: '70%', 'max-width': '90vw' };


	@Input() title = 'Upload a file';
	@Input() refPath = '';
	@Input() isFilterByRefPath = false;
	@Input() additionalField: { [ key: string ]: boolean } = {};
	@Input() ngStyle: StyleMap = {};

	status: Status = Status.initial;
	deletingItem = '';

	data$ = this.fileService.data$.pipe(
		map( data => this.isFilterByRefPath ? data.filter( item => item.refPath === this.refPath ) : data )
	);

	get style (): StyleMap {
		return { ...this.defaultStyle, ...this.ngStyle };
	}
	constructor (
		private fileService: FileService,
		public modalService: ModalService,
		private alert: AlertService,
		@Optional() @Inject( MAT_DIALOG_DATA ) public data?: { refPath: string }
	) { }

	ngOnInit (): void {
		if ( this?.data?.refPath ) this.refPath = this.data.refPath;
	}

	onAddFileClick = () => {
		const ref = this.modalService.open( FileUploaderComponent, { data: { refPath: this.refPath } } );
		console.log( '**** ref.id: ', ref.id );
	}

	onDeleteClick = async ( id: string ) => {
		try {
			this.deletingItem = id;
			this.status = Status.deleting;
			if ( !confirm( 'Are you sure ?' ) ) return;
			await this.fileService.delete( id ).toPromise();
			this.alert.info( 'Deleted successfully' );

		} catch ( error ) {
			this.alert.danger( 'Could not delete this file' );
		}
		finally {
			this.status = Status.done;
			this.deletingItem = '';
		}
	}
}
