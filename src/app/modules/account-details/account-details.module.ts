import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';

const routes: Routes = [
	{ path: ROUTES_MAP.empty, pathMatch: 'full', component: AccountDetailsComponent },
];

@NgModule( {
	declarations: [ AccountDetailsComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
	],
	exports: [ AccountDetailsComponent ],

} )
export class AccountDetailsModule { }
