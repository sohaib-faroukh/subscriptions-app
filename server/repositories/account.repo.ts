import { Account } from 'models/account';
import { DB } from '../configurations/db';
import { AccountEntity } from '../entities/account.entity';
// request data
export const accountRepo = async () => {
	// return ( await DB.getInstance() )?.getMongoRepository<Account>( AccountEntity ) || undefined;
	return;
};


