import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ROUTES_MAP } from 'src/app/routes.map';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

	constructor (
		private router: Router,
		private authenticationService: AuthenticationService ) {
		this.authenticationService.isAuth();
	}

	handle = ( url?: string, methodName: string = 'canActivate' ) => {
		const _isLoggedIn = this.authenticationService.isLoggedIn$.getValue();
		if ( !_isLoggedIn ) this.navigateToLogin();
		// else {
		// 	if ( url ) {
		// 		if ( [ ROUTES_MAP?.login, ROUTES_MAP.signUp ].includes( url ) ) {
		// 			this.router.navigate( [ '/' ] );
		// 		}
		// 		else this.router.navigate( [ url ] );
		// 	}
		// }
		console.log( `**** ${ methodName } ${ _isLoggedIn } ==> ${ url || '' }` );
		return _isLoggedIn;
	}

	navigateToLogin = () => {
		if ( !this.authenticationService.isLoggedIn$.getValue() ) this.router.navigate( [ '/' + ROUTES_MAP.login ] );
	}
	canActivate (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): boolean {
		return this.handle( state?.url || '' );
	}


	canActivateChild (
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): boolean {

		return this.handle( state?.url || '', 'canActivateChild' );

	}

	canLoad (
		route: Route,
		segments: UrlSegment[] ): boolean {
		return this.handle( route?.path || '', 'canLoad' );
	}
}
