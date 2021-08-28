import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsListComponent } from './components/subscriptions-list/subscriptions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
	{
		path: ROUTES_MAP.empty, pathMatch: 'full', component: SubscriptionsListComponent,
	},
	{
		path: ROUTES_MAP.empty, canLoad: [ AuthGuard ], loadChildren: () => import( '../subscription-manage/subscription-manage.module' ).then( m => m.SubscriptionManageModule ),
	},
];

@NgModule( {
	declarations: [ SubscriptionsListComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
	],
	exports: [ SubscriptionsListComponent ],

} )
export class SubscriptionsListModule { }
