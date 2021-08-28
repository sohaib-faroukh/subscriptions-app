import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { getSubscriptionVM, ISubscription, ISubscriptionVM } from 'models/subscription';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComponentStatus, Status } from 'src/app/core/models/component-status';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { stringToDate } from 'utils/date';
import { ModalService } from 'src/app/core/services/modal.service';
import { SubscriptionManageComponent } from 'src/app/modules/subscription-manage/components/subscription-manage/subscription-manage.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { IAccount } from 'models/account';
import { IMap } from 'models/generics/map';
import { arrayToMap } from 'utils/map.util';
import { fullName } from 'utils/full-name';
import { AlertService } from 'src/app/core/services/alert.service';

@Component( {
	selector: 'app-subscriptions-list',
	templateUrl: './subscriptions-list.component.html',
	styleUrls: [ './subscriptions-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class SubscriptionsListComponent implements OnInit, IComponentStatus {
	@Input() listTitle = 'Subscriptions that soon to expire';
	@Input() subscriptions: ISubscription[] = [];

	subscriptions$ = new BehaviorSubject<ISubscriptionVM[]>( [] );

	accounts: IMap<IAccount> = {};

	_subscriptions: ISubscriptionVM[] = [];
	status: Status = Status.initial;

	constructor (
		public auth: AuthenticationService,
		public service: SubscriptionService,
		private cd: ChangeDetectorRef,
		private modalService: ModalService,
		private alert: AlertService,
	) { }

	ngOnInit (): void {
		this.init();
	}

	init = async () => {
		this.accounts = arrayToMap( await this.auth.get().toPromise() || [] );

		this.status = Status.loading;
		try {
			await this.service.get().toPromise();
			this.service.data$.pipe(
				map( data => data.map( item => getSubscriptionVM( item, this.accounts ) ) ),
			).subscribe( this.subscriptions$ );
		} catch ( error ) {
			console.error( error );
		}
		finally {
			this.status = Status.done;
			setTimeout( () => this.cd.detectChanges(), 500 );
		}
	}

	onAddClick = () => {
		this.modalService.open( SubscriptionManageComponent, { disableClose: true } );
	}


	onDeleteClick = async ( id: string ) => {
		try {

			if ( !confirm( 'Are you sure ?' ) ) return;
			await this.service.delete( id ).toPromise();
			this.alert.info( 'Deleted successfully' );

		} catch ( error ) {
			this.alert.danger( 'Could not delete this subscription' );
		}
	}

}
