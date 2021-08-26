import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal.service';

@Component( {
	selector: 'app-subscription-manage',
	templateUrl: './subscription-manage.component.html',
	styleUrls: [ './subscription-manage.component.scss' ],
} )
export class SubscriptionManageComponent implements OnInit {

	constructor ( public dialogRef: MatDialogRef<SubscriptionManageComponent>, public modal: ModalService ) { }

	ngOnInit (): void {
	}

}
