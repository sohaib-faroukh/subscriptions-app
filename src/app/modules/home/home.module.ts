import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ROUTES_MAP } from 'src/app/routes.map';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
	{ path: ROUTES_MAP.empty, pathMatch: 'full', canActivate: [ AuthGuard ], component: HomeComponent },
];

@NgModule( {
	declarations: [ HomeComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
	],
} )
export class HomeModule { }
