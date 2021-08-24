import { Component, OnInit } from '@angular/core';
import { IComponentStatus, Status } from './core/models/component-status';
import { AuthenticationService } from './core/services/authentication.service';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
} )
export class AppComponent implements OnInit, IComponentStatus {
	constructor ( public auth: AuthenticationService ) { }
	status: Status = Status.initial;


	async ngOnInit (): Promise<void> {
		this.status = Status.starting;
		setTimeout( () => this.status = Status.done, 2000 );
	}
}
