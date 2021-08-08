import { Account } from 'models/account';
import { getRepository } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
// request data
export const accountRepo = getRepository<Account>( AccountEntity );

