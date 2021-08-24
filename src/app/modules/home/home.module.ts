import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ROUTES_MAP } from 'src/app/routes.map';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NavbarModule } from '../navbar/navbar.module';
import { SubscriptionsListModule } from '../subscriptions-list/subscriptions-list.module';

const routes: Routes = [
	{ path: ROUTES_MAP.empty, canActivate: [ AuthGuard ], component: HomeComponent },
];

@NgModule( {
	declarations: [ HomeComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		NavbarModule,
		SubscriptionsListModule,
	],
} )
export class HomeModule { }
