import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HttpInterceptorProviders } from './interceptors';
import { SubscriptionService } from './services/subscription.service';
import { ModalService } from './services/modal.service';
import { LoadingBarService } from './services/loading-bar.service';
import { RoutingService } from './services/routing.service';
import { AlertService } from './services/alert.service';


@NgModule( {
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
	],
	providers: [
		HttpInterceptorProviders,
		AuthGuard,
		AuthenticationService,
		SubscriptionService,
		ModalService,
		LoadingBarService,
		RoutingService,
		AlertService,
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
