import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/core/models/component-status';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTES_MAP } from 'src/app/routes.map';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ],
} )
export class HomeComponent implements OnInit {
	loading: Status = Status.initial;
	year = ( new Date() ).getFullYear();
	constructor ( public auth: AuthenticationService ) { }
	ngOnInit (): void {
	}

}
