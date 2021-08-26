import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ISubscription, ISubscriptionVM } from 'models/subscription';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComponentStatus, Status } from 'src/app/core/models/component-status';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { stringToDate } from 'utils/date';
import { ModalService } from 'src/app/core/services/modal.service';
import { SubscriptionManageComponent } from 'src/app/modules/subscription-manage/components/subscription-manage/subscription-manage.component';

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

	_subscriptions: ISubscriptionVM[] = [];
	status: Status = Status.initial;

	constructor (
		public service: SubscriptionService,
		private cd: ChangeDetectorRef,
		private modalService: ModalService,
	) { }
	ngOnInit (): void {
		this.init();
	}

	init = async () => {
		this.status = Status.loading;
		try {
			await this.service.get().toPromise();
			this.service.data$.pipe(
				map( data => {
					return data.map( item => ( {
						...item,
						day: stringToDate( item.time ).format( 'DD' ) || '',
						month: stringToDate( item.time ).format( 'MMM' ) || '',
						icon: item.icon || '',
					} as ISubscriptionVM ) );
				} ),
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
		this.modalService.open( SubscriptionManageComponent );
	}


}
