import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const requestResponder = ( fn: any ) => {
	return async ( req: Request, res: Response, next: NextFunction ) => {
		try {
			await fn( req, res, next ).then( ( result: any ) => {
				if ( !result ) return;
				res.status( StatusCodes.OK ).json( {
					code: StatusCodes.OK,
					message: result.message || 'Success',
					data: result?.onlyDataToBeSent || result,
				} );
			} ).catch( ( e: any ) => { throw e; } );
		} catch ( error ) {
			res.status( StatusCodes.INTERNAL_SERVER_ERROR ).json( {
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				message: error?.message || 'Failure',
				data: null,
			} );
			console.error( '**** ERROR: ', error );
			next();
		}
	};
};
