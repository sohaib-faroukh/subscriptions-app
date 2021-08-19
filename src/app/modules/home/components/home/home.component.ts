import { Component, OnInit } from '@angular/core';
import { ROUTES_MAP } from 'src/app/routes.map';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ],
} )
export class HomeComponent implements OnInit {

	constructor () { }

	get routerMap (): any {
		return { ...ROUTES_MAP };
	}

	ngOnInit (): void {
	}

}
