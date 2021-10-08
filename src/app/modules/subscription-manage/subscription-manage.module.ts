import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManageComponent } from './components/subscription-manage/subscription-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: SubscriptionManageComponent },
];

@NgModule( {
	declarations: [ SubscriptionManageComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
	],
	// exports: [ SubscriptionManageComponent ],
	// entryComponents: [ SubscriptionManageComponent ],

} )
export class SubscriptionManageModule { }
