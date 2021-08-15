import { AccountModel } from '../models-schema/account.schema';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';
import { IAccount } from '../../models/account';

export class AccountRepo {
	static model = AccountModel;

	static findAll = async () => {
		return ( await AccountRepo.model.find() );
	}

	static insert = async ( data: IAccount ) => {
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

		return await newAccount.save();

	}

}

