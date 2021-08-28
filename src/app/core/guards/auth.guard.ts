import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
		// const _isLoggedIn = this.authenticationService.isLoggedIn$.getValue();

		return this.authenticationService.isLoggedIn$.pipe(
			map( _isLoggedIn => {
				if ( !_isLoggedIn ) this.navigateToLogin();
				// if ( url ) this.router.navigateByUrl( url );
				console.log( `**** guard - ${ methodName } ${ _isLoggedIn } ==> ${ url || '' }` );
				return _isLoggedIn;
			} )
		);
	}

	navigateToLogin = () => {
		if ( !this.authenticationService.isLoggedIn$.getValue() ) this.router.navigate( [ '/' + ROUTES_MAP.login ] );
	}


	canActivate (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean> {
		return this.handle( state?.url || '' );
	}


	canActivateChild (
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean> {

		return this.handle( state?.url || '', 'canActivateChild' );

	}

	canLoad (
		route: Route,
		segments: UrlSegment[] ): Observable<boolean> {
		return this.handle( route?.path || '', 'canLoad' );
	}
}
