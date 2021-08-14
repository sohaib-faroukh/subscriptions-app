// import { Request, Response, NextFunction } from 'express';
// import { STATUS_CODES } from 'http';
// import { getEnvironment } from 'server/environments/env.util';

// export const handler = ( err, req: Request, res: Response, next: NextFunction ) => {
// 	const env = getEnvironment();

// 	try {
// 		res.status( 200 ).send( res.co );

// 	} catch ( error ) {
// 		const code = Number( error?.code ) || Number( error?.statusCode ) || 503;
// 		let message = 'some server error has happened';

// 		if ( !env?.production ) message = JSON.stringify( error );
// 		res.status( code ).send( { code, message } );

// 	}
// 	finally {
// 		next();
// 	}
// };


// export const errorHandler = ( err: , req: Request, res: Response, next: NextFunction ) => {
// 	if ( res.headersSent ) {
// 		return next( err )
// 	}
// 	res.status( 500 )
// 	res.render( 'error', { error: err } )
// }
