import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFile, IFileVM } from 'models/file';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';

@Injectable()
export class FileService extends BaseCrudService<IFile, HttpSearchOptions> {

	constructor ( public http: HttpClient ) {
		super( http );
		this.apiUrl = 'api/files';
		this.init();
	}

	/**
	 * method responsible if init the service which it should be called in the constructor of the service
	 */
	private init = async ( configs?: HttpSearchOptions ) => {
		return await this.fetch( configs ).toPromise();
	}


	/**
	 * retrieve a list of file for a specific screen by its unique refPath
	 * @param refPath unique id for each page or section to associate this file with it
	 */
	getFilesByRefPath = ( refPath: string ): Observable<IFile[]> => {
		if ( !refPath ) return of( [] );
		return this.data$.pipe(
			map( data => data.filter( ele => ele.refPath && ele.refPath === refPath ) )
		);
	}

	post = ( payload: IFileVM ): Observable<IFile> => {
		if ( !payload ) throw new Error( 'Invalid argument' );

		const formData = new FormData();

		const field = environment?.FileUploaderFieldName || undefined;
		if ( !field ) throw new Error( 'Invalid environment field name' );
		if ( !payload.file ) throw new Error( 'Not provided file' );

		if ( payload.refPath ) formData.append( 'refPath', payload.refPath );
		if ( payload.lastModifiedDate ) formData.append( 'lastModifiedDate', payload.lastModifiedDate );
		formData.append( field, payload.file );

		return this.pipes( this.http.post<IFile>( this.apiUrl, formData ) );
	}
}
