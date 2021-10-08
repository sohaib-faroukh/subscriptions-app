
import { fullName } from 'utils/full-name';
import { IdentityWithLogInfo, IIdentityWithLogInfo } from './generics/IdentityWithLogInfo';

export interface IAccount extends IIdentityWithLogInfo {
	firstName: string;
	lastName?: string;
	username?: string
	email: string;
	password?: string;
	token?: string;
	type: 'corporate' | 'personal';
	lastLoginAt?: string;
	isCorporate: boolean;
}

export class Account extends IdentityWithLogInfo implements IAccount {
	firstName: string = '';
	lastName?: string = '';
	username?: string = '';
	email: string = '';
	password?: string = '';
	token?: string = '';
	type: 'corporate' | 'personal' = 'personal';
	lastLoginAt?: string = '';
	isCorporate: boolean = false;

	public fullName = (): string => {
		return fullName( this.firstName, this.lastName );
	}
}

export interface IAccountVM extends IAccount {
	fullName?: string;
}
