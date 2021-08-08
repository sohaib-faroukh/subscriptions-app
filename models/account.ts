
import { IdentityWithLogInfo } from './generics/IdentityWithLogInfo';

export class Account extends IdentityWithLogInfo {
	firstName: string = '';
	lastName?: string = '';
	username?: string = '';
	email: string = '';
	password?: string = '';
	token?: string = '';
	type: 'corporate' | 'personal' = 'personal';
	lastLoginAt?: string = '';
	isCorporate: boolean = false;
}
