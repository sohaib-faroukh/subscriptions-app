import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManageComponent } from './components/subscription-manage/subscription-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule( {
	declarations: [ SubscriptionManageComponent ],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [ SubscriptionManageComponent ],

} )
export class SubscriptionManageModule { }
