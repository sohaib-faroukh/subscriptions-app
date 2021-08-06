import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-angular-initial-page',
	templateUrl: './angular-initial-page.component.html',
	styleUrls: [ './angular-initial-page.component.scss' ]
} )
export class AngularInitialPageComponent implements OnInit {
	title = 'ebtasm-web-ui';
	constructor () { }

	ngOnInit (): void {
	}

}
