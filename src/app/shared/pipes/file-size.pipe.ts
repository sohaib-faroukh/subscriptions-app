import { Pipe, PipeTransform } from '@angular/core';
import { formatSize } from 'utils/format-file-size.util';

@Pipe( {
	name: 'fileSize',
	pure: true,
} )
export class FileSizePipe implements PipeTransform {

	transform ( value: number | undefined ): string {
		return formatSize( value || 0 ) || '';
	}

}
