import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getSubscriptionVM, ISubscription, ISubscriptionVM } from 'models/subscription';
import { BehaviorSubject, combineLatest, from, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IComponentStatus, Status } from 'src/app/core/models/component-status';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { SubscriptionManageComponent } from 'src/app/modules/subscription-manage/components/subscription-manage/subscription-manage.component';
import { arrayToMap } from 'utils/map.util';

@Component( {
	selector: 'app-subscriptions-list',
	templateUrl: './subscriptions-list.component.html',
	styleUrls: [ './subscriptions-list.component.scss' ],
} )
export class SubscriptionsListComponent implements OnInit, OnDestroy, IComponentStatus {
	@Input() listTitle = 'Subscriptions that soon to expire';
	@Input() subscriptions: ISubscription[] = [];

	subscriptions$ = new BehaviorSubject<ISubscriptionVM[]>( [] );

	// accounts: IMap<IAccount> = {};

	_subscriptions: ISubscriptionVM[] = [];
	status: Status = Status.initial;

	subs: Subscription = new Subscription();

	constructor (
		public auth: AuthenticationService,
		public service: SubscriptionService,
		private modalService: ModalService,
		private alert: AlertService,
	) { }

	ngOnInit (): void {
		this.init();
	}


	ngOnDestroy (): void {
		console.log( '*****  SubscriptionsListComponent - Destroy' );
		this.subscriptions$.next( [] );
		this.subs.unsubscribe();
	}



	init = () => {
		try {
			this.service.get().toPromise();
			const observable = combineLatest( [
				of( this.status = Status.loading ),
				this.service.data$,
				this.auth.get().pipe(
					map( accounts => arrayToMap( accounts || [] ) ),
				),
			] ).pipe(
				map( ( [ , data, accounts ] ) => data.map( item => getSubscriptionVM( item, accounts ) ) ),
				tap( () => { setTimeout( () => { this.status = Status.done; }, 500 ); } ),
				catchError( ( err, c ) => { throw err; } )
			);
			this.subs.add( observable.subscribe( this.subscriptions$ ) );
		} catch ( error ) {
			this.status = Status.initial;
			console.error( error );
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
