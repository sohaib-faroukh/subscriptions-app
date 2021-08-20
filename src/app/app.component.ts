import { Component, OnInit } from '@angular/core';
import { ComponentStatus } from './core/models/component-status';
import { AuthenticationService } from './core/services/authentication.service';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
} )
export class AppComponent implements OnInit {

	loading: ComponentStatus = ComponentStatus.initial;
	constructor ( public auth: AuthenticationService ) { }

	async ngOnInit (): Promise<void> {
		this.loading = ComponentStatus.starting;
		// await this.auth.isAuth();
		setTimeout( () => this.loading = ComponentStatus.done, 2000 );
	}
}
