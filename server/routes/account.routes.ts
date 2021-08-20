import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IAccount } from '../../models/account';
import { AccountRepo } from '../repositories/account.repo';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';
import { QueryParam } from '../../utils/query-param';
import { body, query } from 'express-validator';
import { requestValidator } from '../../utils/request-validator.util';
import { requestResponder } from '../../utils/request-responder.util';
import { generateAuthToken, verifyAuthToken } from '../../utils/jwt.util';
import { IAccountDocument } from '../../server/models-schema/account.schema';



/**
 * GET api for accounts [TODO: need to be secured]
 */

export const getAccounts: RequestHandler[] = [

	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const defaultQueryParam = QueryParam.getDefault();
		const myQuery: Required<QueryParam> = {
			...QueryParam.getDefault(),
			take: req?.query?.take ? Number( req?.query?.take ) : defaultQueryParam?.take,
			start: req?.query?.start ? Number( req?.query?.start ) : defaultQueryParam?.start,
		} as Required<QueryParam>;

		const repo = ( await AccountRepo.findAll() );
		const accounts: IAccountDocument[] = repo || [];

		return accounts;

	} ),

];

export const isAccountAuth: RequestHandler[] = [
	query( 'token' ).exists().bail().isString(),
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const token = req?.query?.token as string || '';
		if ( !token ) throw new Error( 'Token is not provided' );
		const account = verifyAuthToken( token ) as IAccountDocument;
		if ( !account || !account?.email ) throw new Error( 'The token account is not found' );
		const result = ( await AccountRepo.findOne( { email: account?.email } ) );
		if ( !result ) throw new Error( 'The token account is not found' );

		return true;

	} ),

];

export const postAccount: RequestHandler[] = [
	body( 'email' ).exists().isEmail(),
	body( 'firstName' ).exists().isString(),
	body( 'lastName' ).optional().isString(),
	body( 'username' ).optional().isString(),
	body( 'password' ).exists().isString(),
	body( 'type' ).custom( ( e: string ) => [ 'corporate', 'personal' ].includes( e ) ),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const payload = req?.body as Partial<IAccount>;
		const current = getCurrent();
		payload.createdAt = current;
		payload.createdBy = ( await getLoggedInAccount( req.headers.authorization ) )?.id;
		payload.id = uuid();
		payload.type ||= 'personal';
		payload.isCorporate ||= false;
		payload.updatedAt = current;

		const newAccount: IAccountDocument = payload as IAccountDocument;
		newAccount.token = generateAuthToken( newAccount );

		const result = ( await AccountRepo.insert( newAccount ) ) || null;
		delete result.password;

		return result;

	} ),

];

const getLoggedInAccount = async ( token: string | undefined ): Promise<IAccount | null> => {
	if ( !token ) return null;
	const account = verifyAuthToken( token );
	if ( account ) {
		return AccountRepo.findById( account._id ) || null;
	}
	else return null;

};
