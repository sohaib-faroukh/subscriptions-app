import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Account, IAccount } from '../../models/account';
import { AccountRepo } from '../repositories/account.repo';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';
import { QueryParam } from '../../utils/query-param';



/**
 * GET api for accounts [TODO: need to be secured]
 */

export const getAccounts: RequestHandler[] = [
	async ( req: Request, res: Response, next: NextFunction ) => {
		try {

			const defaultQueryParam = QueryParam.getDefault();
			const query: Required<QueryParam> = {
				...QueryParam.getDefault(),
				take: req?.query?.take ? Number( req?.query?.take ) : defaultQueryParam?.take,
				start: req?.query?.start ? Number( req?.query?.start ) : defaultQueryParam?.start,
			} as Required<QueryParam>;

			const repo = ( await AccountRepo.findAll() );
			const accounts: Account[] = repo || []; // await repo?.find( { take: query.take, skip: ( query.take * query.start ) } ) || [];
			// const accounts: Account[] = await repo?.find() || [];

			res.status( 200 ).json( { code: 200, data: accounts, message: 'accounts fetched' } );
		}
		catch ( err ) {
			console.error( err );
			res.status( err.status || 500 ).
				json( {
					code: err.status || 500,
					data: {},
					message: '',
					error: err.message || 'Failed to fetch accounts',
				} );
		}
	},

];
export const postAccount: RequestHandler[] = [
	async ( req: Request, res: Response, next: NextFunction ) => {
		try {
			const payload = req?.body as Partial<Account>;
			const current = getCurrent();
			payload.createdAt = current;
			payload.createdBy = ( await getLoggedInAccount() )?.id;
			payload.id = uuid();
			payload.type ||= 'personal';
			payload.isCorporate ||= false;
			payload.updatedAt = current;

			const newAccount: IAccount = payload as IAccount;
			const result = ( await AccountRepo.insert( newAccount ) ) || null;


			res.status( 200 ).json( { code: 200, data: result, message: 'account is inserted' } );
		}
		catch ( err ) {
			console.error( err );
			res.status( err.status || 500 ).
				json( {
					code: err.status || 500,
					data: {},
					message: '',
					error: err.message || 'Failed to insert the account',
				} );
		}
	},

];
const getLoggedInAccount = async (): Promise<Account | undefined> => {
	const account: Account | undefined = undefined; // ( await ( await accountRepo() )?.find( { where: { email: 'sohaib.faroukh@gmail.com' } } ) || [] )[ 0 ];
	return account;
};
