import { AccountModel, IAccountDocument } from '../models-schema/account.schema';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';

export class AccountRepo {
	static model = AccountModel;

	static find = async ( filters?: any ) => {
		return ( await AccountRepo.model.find( filters ) );
	}

	static findOne = async ( filters?: any ) => {
		return ( await AccountRepo.model.findOne( filters ) );
	}
	static findAll = async ( filters?: any ) => {
		return ( await AccountRepo.model.find( filters ) );
	}
	static findById = async ( id: string ) => {
		return ( await AccountRepo.model.findById( id ) );
	}

	static insert = async ( data: IAccountDocument ): Promise<IAccountDocument> => {
		const ID = uuid();
		const current = getCurrent();
		const newAccount = new AccountModel( {
			id: ID,
			firstName: data?.firstName || '',
			lastName: data?.lastName || '',
			email: data?.email || '',
			username: data?.username || '',
			password: data?.password || '',
			token: data?.token || '',
			type: data?.type || 'personal',
			isCorporate: data?.isCorporate || false,
			createdBy: ID,
			createdAt: current,
			updatedAt: current,
			lastLoginAt: '',
		} );

		return await newAccount.save().catch( e => { throw e; } );

	}

}

