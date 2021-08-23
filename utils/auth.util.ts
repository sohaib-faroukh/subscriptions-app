import { Request, Response, NextFunction } from 'express';
import { IAccount } from '../models/account';
import { AccountRepo } from '../server/repositories/account.repo';
import { verifyAuthToken } from './jwt.util';

export const getToken = ( param: string ): string => {
	const token = param?.trim()?.includes( ' ' ) ? param?.trim()?.split( ' ' )[ 1 ] : param?.trim();
	return token;
};

export const authorize = async ( req: Request, res: Response, next: NextFunction ) => {
	if ( !req?.headers?.authorization ) throw new Error( '1. Not authorized' );

	const token = getToken( req?.headers?.authorization );
	const decodedAccount = verifyAuthToken( token ) as IAccount;
	if ( !decodedAccount?.id ) throw new Error( '2. Not authorized' );
	const foundAccount = await AccountRepo.findOne( { id: decodedAccount?.id } );
	if ( !foundAccount ) throw new Error( '3. Not authorized' );

	// after pass all checks go to the next request
	next();
};
