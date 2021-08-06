import { Account } from './account';

export class User extends Account {
	constructor (
		public firstName: string,
		public lastName: string,
		public email: string,
		public password?: string,
	) {
		super( email, password );
	}

	// static build = ( newUser: Partial<User> ) => {
	// 	return new User( newUser?.firstName || '', newUser?.lastName || '', newUser?.email || '' );
	// }
	public fullName = (): string => {
		return `${ this.firstName || '' }${ this.firstName && this.lastName ? ' ' + this.lastName : this.lastName || '' }` || '';
	}


}
