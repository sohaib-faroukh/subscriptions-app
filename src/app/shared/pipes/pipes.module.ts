import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from './file-size.pipe';

const pipes = [
	FileSizePipe,
];

@NgModule( {
	declarations: [ ...pipes ],
	imports: [
		CommonModule,
	],
	exports: [ ...pipes ],
} )
export class PipesModule { }
