import { Component, ElementRef, Input, OnInit } from '@angular/core';

type Sizes = 'small' | 'large';


@Component( {
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: [ './spinner.component.scss' ],
} )
export class SpinnerComponent implements OnInit {

	@Input() data: { size: Sizes } = { size: 'large' };

	constructor ( public _elementRef: ElementRef ) { }

	ngOnInit (): void {
	}

}
