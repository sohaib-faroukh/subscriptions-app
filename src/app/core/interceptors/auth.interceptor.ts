import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getItemFromStorage } from '../utils/local-storage.util';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor () { }

	intercept ( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
		try {
			const token = getItemFromStorage( environment.JWT_STORAGE_KEY );
			if ( token ) {
				const authReq = request.clone( { setHeaders: { authorization: token } } );
				return next.handle( authReq );
			} else {
				return next.handle( request );
			}
		} catch ( error ) {
			console.log( error );
			return next.handle( request );
		}
	}
}
