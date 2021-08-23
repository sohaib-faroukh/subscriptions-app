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
import { compare, encode } from '../../utils/bcrypt.util';
import { clone } from '../../utils/clone.util';
import { getToken } from '../../utils/auth.util';



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

		return accounts.map( acc => secure( acc ) );

	} ),

];

export const isAccountAuth: RequestHandler[] = [
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const token = req?.headers?.authorization;
		if ( !token ) throw new Error( 'Not authenticated, the token is not exist' );
		const account = verifyAuthToken( token ) as IAccountDocument;
		if ( !account || !account?.email ) throw new Error( 'The account is not found' );
		const result = ( await AccountRepo.findOne( { email: account?.email } ) );
		if ( !result ) throw new Error( 'The token account is not found' );

		return true;

	} ),

];

/**
 * Sign up new account
 */
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
		payload.createdBy = ( await getLoggedInAccount( req.headers.authorization ) )?.id || '';
		payload.id = uuid();
		payload.type ||= 'personal';
		payload.isCorporate ||= false;
		payload.updatedAt = current;
		if ( !payload?.password ) throw new Error( 'No password is provided' );
		payload.password = encode( payload.password );
		const newAccount: IAccountDocument = payload as IAccountDocument;
		newAccount.token = generateAuthToken( newAccount );

		const result = ( await AccountRepo.insert( newAccount ) ) || null;
		delete result.password;

		return secure( result );

	} ),

];


/**
 * Login account
 */
export const postLoginAccount: RequestHandler[] = [
	body( 'email' ).exists().isEmail(),
	body( 'password' ).exists().isString(),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const { email, password } = req?.body as Partial<IAccount>;

		const emailAccount = ( await AccountRepo.findOne( { email } ) ) as IAccountDocument | null;
		if ( !emailAccount ) throw new Error( 'Email is not found' );
		if ( !emailAccount?.password ) throw new Error( 'No password attached with the account' );

		const isPasswordMatch = compare( password || '', emailAccount?.password );

		if ( !isPasswordMatch ) throw new Error( 'Wrong password' );

		return secure( emailAccount );

	} ),

];

export const getLoggedInAccount = async ( token: string | undefined ): Promise<IAccount | null> => {
	if ( !token ) return null;

	token = getToken( token );
	const account = verifyAuthToken( token );
	if ( account ) {
		return await AccountRepo.findOne( { email: account.email } ) || null;
	}
	else return null;

};

const secure = ( input: any ): any => {
	const result: any = clone( input );
	if ( 'password' in result ) delete result.password;
	return result;
};

