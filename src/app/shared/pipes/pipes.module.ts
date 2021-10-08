import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './file-size.pipe';
import { SubscriptionsOfDayPipe } from './subscriptions-of-day.pipe';

const pipes = [
	FileSizePipe, SubscriptionsOfDayPipe,
];

@NgModule( {
	declarations: [ ...pipes ],
	imports: [
		CommonModule,
	],
	exports: [ ...pipes ],
} )
export class PipesModule { }
