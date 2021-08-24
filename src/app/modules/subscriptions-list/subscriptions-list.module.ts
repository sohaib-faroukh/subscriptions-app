import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule( {
	declarations: [ SubscriptionsListComponent ],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [ SubscriptionsListComponent ],

} )
export class SubscriptionsListModule { }
