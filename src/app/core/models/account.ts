export class Account {
	public token?: string;

	constructor (
		public email: string,
		public password?: string
	) { }
}
