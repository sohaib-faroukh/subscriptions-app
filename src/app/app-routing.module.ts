import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from './routes.map';

const routes: Routes = [
	// { path: ROUTES_MAP.empty, redirectTo: ROUTES_MAP.docs, pathMatch: 'full' },
	{
		path: ROUTES_MAP.docs, loadChildren: () => import( './documentation/documentation.module' ).then( m => m.DocumentationModule ),
	},
	{
		path: ROUTES_MAP.signUp, loadChildren: () => import( './modules/sign-up/sign-up.module' ).then( m => m.SignUpModule ),
	},
	{
		path: ROUTES_MAP.login, loadChildren: () => import( './modules/login/login.module' ).then( m => m.LoginModule ),
	},
	{ path: ROUTES_MAP.error, redirectTo: ROUTES_MAP.login },
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ],
} )
export class AppRoutingModule { }