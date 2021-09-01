import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccountVM } from 'models/account';
import { IFormBuilder } from 'models/generics/form-builder';
import { ISubscription } from 'models/subscription';
import { combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { IComponentStatus, Status } from 'src/app/core/models/component-status';
import { ISelectOption } from 'src/app/core/models/select-option';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { CustomValidators } from 'src/app/core/utils/validators';
import { FilesListComponent } from 'src/app/shared/file-uploader/components/files-list/files-list.component';
import { formatDate, getCurrentDate, momentToDate } from 'utils/date';
import { fullName } from 'utils/full-name';

@Component( {
	selector: 'app-subscription-manage',
	templateUrl: './subscription-manage.component.html',
	styleUrls: [ './subscription-manage.component.scss' ],
} )
export class SubscriptionManageComponent implements OnInit, OnDestroy, IComponentStatus, IFormBuilder {

	@Input() data: ISubscription | undefined = undefined;
	myFormGroup: FormGroup;
	title = 'Add new subscription...';
	status: Status = Status.initial;
	destroy$ = new Subject();
	accounts$ = combineLatest( [
		this.auth.data$,
		this.auth.loggedInAccount$ ] )
		.pipe(
			map( ( [ accounts, account ] ) => accounts.filter( acc => ( account ? acc.type !== account?.type && acc.id !== account?.id : true ) ) ),
			map( accounts => accounts.map( acc => ( { ...acc, fullName: fullName( acc?.firstName, acc?.lastName ) } as IAccountVM ) ) ),
		);

	repeatSelectOptions: ISelectOption[] = [
		{ id: 'daily', title: 'Daily', value: 'daily' },
		{ id: 'monthly', title: 'Monthly', value: 'monthly' },
		{ id: 'yearly', title: 'Yearly', value: 'yearly' },
	];
	constructor (
		public modal: ModalService,
		public fb: FormBuilder,
		public srv: SubscriptionService,
		public auth: AuthenticationService,
		public alert: AlertService,
	) {
		this.myFormGroup = this.build();
	}

	ngOnInit (): void {

		// console.log( injectParamsValuesInString( 'sohaib $1 for test $2', [ 'ONE', 'TWO' ] ) );
		this.init();
	}

	ngOnDestroy (): void {
		this.destroy$.next();
	}

	init = async () => {
		this.status = Status.loading;
		try {
			await this.auth.get().toPromise();
		} catch ( error ) {
			console.error( error );
		}
		finally {
			this.status = Status.done;
		}
	}

	build = ( data?: any ): FormGroup => {
		const current = getCurrentDate();
		const currentDate = momentToDate( current );

		const fromDate = formatDate( currentDate );
		const toDate = formatDate( current.clone().add( 4, 'days' ) );

		return this.fb.group( {
			firstParty: [ data?.firstParty || '' ],
			secondParty: [ data?.secondParty || '', [ Validators.required ] ],
			description: [ data?.description || '', [ Validators.required ] ],
			repeat: [ data?.repeat || 'monthly', [ Validators.required ] ],
			time: [ data?.time || currentDate, [ Validators.required, CustomValidators.dateRangeValidator( fromDate, toDate ) ] ],
			count: [ data?.count || 1, [ Validators.max( 24 ), Validators.min( 1 ) ] ],
			icon: [ data?.icon || '' ],
		} );
	}

	onSubmit = () => {
		const values = this.myFormGroup.getRawValue() as ISubscription;
		values.time = formatDate( values.time );

		const cnf = confirm( 'Are you sure ?' );
		if ( !cnf ) return;
		this.handleSubmit( values );

	}

	private handleSubmit = ( values: ISubscription ) => {

		this.srv.post( values ).pipe(
			take( 1 ),
			takeUntil( this.destroy$ ),
			tap( () => this.alert.success( 'added successfully' ) ),
			tap( () => this.modal.close() ),
		).subscribe();
	}

	getControl = ( name: string ): FormControl => {
		return this.myFormGroup?.get( name ) as FormControl || null;
	}

}
