import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';

const routes: Routes = [
	{
		path: ROUTES_MAP.empty, component: ClientLayoutComponent, children: [
			{ path: ROUTES_MAP.empty, loadChildren: () => import( '../../modules/home/home.module' ).then( m => m.HomeModule ) },
		],
	},
];

@NgModule( {
	declarations: [ ClientLayoutComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
	],
} )
export class ClientLayoutModule { }
