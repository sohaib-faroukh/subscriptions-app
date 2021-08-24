import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal.service';

@Component( {
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: [ './modal.component.scss' ],
} )
export class ModalComponent implements OnInit {

	constructor ( public dialogRef: MatDialogRef<ModalComponent>, public modal: ModalService ) { }

	ngOnInit (): void {
	}

}
