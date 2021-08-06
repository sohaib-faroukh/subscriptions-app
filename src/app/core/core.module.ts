import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';



@NgModule( {
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
	],
	providers: [
		AuthenticationService,
	],
} )
/**
 * The CoreModule contains application-wide singleton services
 */
export class CoreModule {
	constructor ( @Optional() @SkipSelf() core: CoreModule ) {
		if ( core ) {
			throw new Error( 'You should import core module only in the root module' );
		}
	}
}
