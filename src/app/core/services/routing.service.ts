import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ROUTES_MAP } from 'src/app/routes.map';
import { AuthenticationService } from './authentication.service';
import { LoadingBarService } from './loading-bar.service';

@Injectable()
export class RoutingService implements OnDestroy {

	loadingIndicatorHtmlId = 'loading-indicator-id';
	appHtmlId = 'app-id';
	timeout = 750;
	bar: {
		mode: ProgressBarMode,
		color?: string,
		height?: string
	} = {
			color: '#ffa136',
			height: '0.5rem',
			mode: 'indeterminate',
		};


	classes: string[][] = [
		/* classes for the loading-indicator */[ 'loading-indicator-show' ],
		/* classes for the app */[ 'no-events', 'pointer-wait' ],
	];

	private _loading = false;
	public loading$ = new BehaviorSubject<boolean>( false );
	private subs: Subscription = new Subscription();

	constructor ( private router: Router, private auth: AuthenticationService, @Inject( DOCUMENT ) private document: Document, private _loadingBar: LoadingBarService ) {
		this._loadingBar.interval = this.timeout;
		this.animateNavigation();
		const sub = this.router.events
			.pipe(
				filter( e => e instanceof NavigationEnd ),
				map( e => e as NavigationEnd ),
				tap( e => {
					console.log( `**** from auth service router pipe: `, e.url );
				} ),
				filter( e => [ ROUTES_MAP?.login, ROUTES_MAP.signUp ].map( r => `/${ r }` ).includes( e.url ) ),
				tap( e => {
					console.log( `**** from auth service PASSED: `, e.url );
					if ( this.auth.isLoggedIn ) this.router.navigateByUrl( '/' );
				} ),
			).subscribe();
		this.subs.add( sub );
	}
	ngOnDestroy (): void {
		console.log( `**** ${ RoutingService.name } ngOnDestroy` );
		this.subs.unsubscribe();
	}



	setLoading = ( value: boolean, isIssue = false ) => {
		console.log( '**** setting loading value...', value );
		this._loadingBar.reset();
		this._loading = value;
		this.loading$.next( this._loading );
		if ( value === true ) {
			this.addLoadingClasses();
			this._loadingBar.start();
		}
		else {
			const timeout = this.timeout < 1500 ? 1500 : ( this.timeout > 4000 ? this.timeout / 2 : this.timeout );
			setTimeout( () => {
				this.removeLoadingClasses();
			}, timeout );
			!isIssue ? this._loadingBar.complete() : this._loadingBar.stop();

		}
	}



	private animateNavigation = () => {
		const sub = this.router.events.subscribe( ( event: any ) => {
			switch ( true ) {
				case event instanceof NavigationStart: {
					this.setLoading( true );
					// this._loadingBar.start();
					break;
				}
				case event instanceof NavigationEnd: {
					// this._loadingBar.complete();
					this.setLoading( false );
					break;
				}
				case event instanceof NavigationCancel:
				case event instanceof NavigationError: {
					// this._loadingBar.stop();
					this.setLoading( false, true );
					break;
				}
				default: break;
			}
		} );
		this.subs.add( sub );
	}



	addLoadingClasses = () => {
		console.log( '**** setting classes' );
		const appDOM = this.document.getElementById( this.appHtmlId );
		const indicatorDOM = this.document.getElementById( this.loadingIndicatorHtmlId );

		if ( indicatorDOM ) {
			for ( const cls of this.classes[ 0 ] ) {
				indicatorDOM?.classList.add( cls );
			}
		}
		if ( indicatorDOM ) {
			for ( const cls of this.classes[ 1 ] ) {
				appDOM?.classList.add( cls );
			}
		}

	}

	removeLoadingClasses = () => {
		console.log( '**** removing classes' );
		const appDOM = this.document.getElementById( this.appHtmlId );
		const indicatorDOM = this.document.getElementById( this.loadingIndicatorHtmlId );

		if ( indicatorDOM ) {
			for ( const cls of this.classes[ 0 ] ) {
				indicatorDOM?.classList.remove( cls );
			}
		}
		if ( indicatorDOM ) {
			for ( const cls of this.classes[ 1 ] ) {
				appDOM?.classList.remove( cls );
			}
		}

	}


}
