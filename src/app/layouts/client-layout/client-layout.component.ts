import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/core/models/component-status';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component( {
	selector: 'app-client-layout',
	templateUrl: './client-layout.component.html',
	styleUrls: [ './client-layout.component.scss' ],
} )
export class ClientLayoutComponent implements OnInit {
	loading: Status = Status.initial;
	constructor ( public auth: AuthenticationService ) { }

	async ngOnInit (): Promise<void> {
		// this.loading = ComponentStatus.starting;
		// await this.auth.isAuth();
		this.loading = Status.done;
	}

}
