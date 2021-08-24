import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { uuid } from 'utils/uuid';

interface ModalMap<D> {
	[ key: string ]: MatDialogRef<D>;
}

@Injectable()
export class ModalService {

	public modalRef: MatDialogRef<any> & { id: string } | null = null;
	private _config = new MatDialogConfig();
	public modals: ModalMap<any> = {};
	public modals$ = new BehaviorSubject<ModalMap<any>>( {} );

	constructor ( public matDialog: MatDialog ) { }

	register = <D = any> ( id: string, modalDialogRef: MatDialogRef<D> ) => {
		this.modalRef = { ...modalDialogRef, id } as MatDialogRef<D>;
		this.modals[ id ] = modalDialogRef;
		this.modals$.next( this.modals );
	}

	open = <T, D = any, R = any> ( component: ComponentType<T>, config?: MatDialogConfig<D> ): MatDialogRef<T, R> => {

		// TODO: abstract dialog config
		const dialogConfig = new MatDialogConfig();
		dialogConfig.position = { top: '6rem' };
		// dialogConfig.height = 'calc(100vh - 30%)';
		// dialogConfig.width = '50vw';

		const newId = uuid();
		dialogConfig.id = newId;
		const modalDialogRef = this.matDialog.open( component, dialogConfig );
		this.modals[ newId ] = modalDialogRef;
		this.modals$.next( this.modals );
		return modalDialogRef;
	}


	close = () => {
		if ( !this.modalRef ) return;
		const id = this.modalRef.id;
		delete this.modals[ id ];
		this.modals$.next( this.modals );
		this.modalRef.close();
		this.modalRef = null;
	}

}
