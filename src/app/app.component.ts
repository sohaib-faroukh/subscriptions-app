import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
enum ComponentStatus {
	initial = 0,
	starting = 1,
	loading = 2,
	done = 3,
}
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
		await this.auth.isAuth();
		this.loading = ComponentStatus.done;
	}
}
