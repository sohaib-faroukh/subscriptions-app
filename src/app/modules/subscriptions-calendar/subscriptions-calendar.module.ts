import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsCalendarComponent } from './components/subscriptions-calendar/subscriptions-calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
	{
		path: ROUTES_MAP.empty, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', component: SubscriptionsCalendarComponent },
		],
	},
];

@NgModule( {
	declarations: [ SubscriptionsCalendarComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
	],
	exports: [ SubscriptionsCalendarComponent ],
} )
export class SubscriptionsCalendarModule { }
