import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularInitialPageComponent } from './components/angular-initial-page/angular-initial-page.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
	{ path: '', pathMatch: 'full', component: AngularInitialPageComponent },
];

@NgModule( {
	declarations: [
		AngularInitialPageComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
	],
} )
export class DocumentationModule { }
