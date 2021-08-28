import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NavbarModule } from 'src/app/modules/navbar/navbar.module';

const routes: Routes = [
	{
		path: ROUTES_MAP.empty, component: ClientLayoutComponent, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', redirectTo: ROUTES_MAP.subscriptions },
			{ path: ROUTES_MAP.home, canLoad: [ AuthGuard ], loadChildren: () => import( '../../modules/home/home.module' ).then( m => m.HomeModule ) },
			{ path: ROUTES_MAP.subscriptions, canLoad: [ AuthGuard ], loadChildren: () => import( '../../modules/subscriptions-list/subscriptions-list.module' ).then( m => m.SubscriptionsListModule ) },
		],
	},
];

@NgModule( {
	declarations: [ ClientLayoutComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		NavbarModule,
	],
} )
export class ClientLayoutModule { }
