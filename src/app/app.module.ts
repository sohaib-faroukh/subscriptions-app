import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { SharedModule } from './shared/shared.module';

@NgModule( {
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		NavbarModule,
		// ! for test only
		SharedModule,
	],
	providers: [],
	bootstrap: [ AppComponent ],
} )
export class AppModule { }
