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


	navigateToLogin = () => {
		if ( !this.authenticationService.isLoggedIn$.getValue() ) this.router.navigate( [ '/' + ROUTES_MAP.login ] );
	}
	canActivate (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): boolean {
		const _isLoggedIn = this.authenticationService.isLoggedIn$.getValue();
		if ( !_isLoggedIn ) this.navigateToLogin();
		// else {
		// 	this.router.navigate( [ state.url ] );
		// }
		console.log( `**** canActivate ${ _isLoggedIn } ==> ${ state?.url || '' }` );
		return _isLoggedIn;
	}
	canActivateChild (
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): boolean {
		const _isLoggedIn = this.authenticationService.isLoggedIn$.getValue();
		if ( !_isLoggedIn ) this.navigateToLogin();
		console.log( `**** canActivateChild ${ _isLoggedIn } ==> ${ state?.url || '' }` );
		return _isLoggedIn;
	}
	canLoad (
		route: Route,
		segments: UrlSegment[] ): boolean {
		const _isLoggedIn = this.authenticationService.isLoggedIn$.getValue();
		if ( !_isLoggedIn ) this.navigateToLogin();

		console.log( `**** canLoad ${ _isLoggedIn }  ==> ${ route?.path || '' }` );
		return _isLoggedIn;
	}
}
