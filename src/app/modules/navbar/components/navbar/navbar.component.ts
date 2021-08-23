import { Component, OnInit } from '@angular/core';
import { ComponentStatus } from 'src/app/core/models/component-status';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTES_MAP } from 'src/app/routes.map';

@Component( {
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ],
} )
export class NavbarComponent implements OnInit {

	loading: ComponentStatus = ComponentStatus.initial;

	constructor ( public auth: AuthenticationService ) { }
	ngOnInit (): void {
	}

	get routerMap (): any {
		return { ...ROUTES_MAP };
	}

	onLogout = () => {
		this.loading = ComponentStatus.starting;
		this.auth.logout();
		this.loading = ComponentStatus.done;
	}

}
