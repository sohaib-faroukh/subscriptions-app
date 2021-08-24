import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HttpInterceptorProviders } from './interceptors';
import { SubscriptionService } from './services/subscription.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalService } from './services/modal.service';
import { MaterialModule } from './material-module';


@NgModule( {
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		// MatButtonModule,
		// MatDialogModule,
		MaterialModule,
	],
	providers: [
		HttpInterceptorProviders,
		AuthGuard,
		AuthenticationService,
		SubscriptionService,
		ModalService,
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
