import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import { Account } from 'models/account';
import { BaseColumnSchemaPart } from '../models-schema/schema';

export const AccountEntity = new EntitySchema<Account>( {
	name: 'account',
	columns: {
		...BaseColumnSchemaPart,
		firstName: {
			name: 'first_name',
			type: 'text',
			nullable: true,
		} as EntitySchemaColumnOptions,
		lastName: {
			name: 'last_name',
			type: 'text',
			nullable: true,
		} as EntitySchemaColumnOptions,
		username: {
			name: 'username',
			type: 'text',
			nullable: true,
		} as EntitySchemaColumnOptions,
		email: {
			name: 'email',
			type: 'text',
			nullable: false,
		} as EntitySchemaColumnOptions,
		password: {
			name: 'password',
			type: 'text',
			nullable: true,
		} as EntitySchemaColumnOptions,
		type: {
			name: 'type',
			type: 'text',
			nullable: false,
			default: 'personal',
		} as EntitySchemaColumnOptions,
		lastLoginAt: {
			name: 'last_login_at',
			type: 'text',
			nullable: false,
			default: 'personal',
		} as EntitySchemaColumnOptions,
		isCorporate: {
			name: 'is_corporate',
			type: 'boolean',
			nullable: false,
			default: false,
		} as EntitySchemaColumnOptions,
	},
	indices: [
		{ name: 'ix_unique_email', unique: true, columns: [ 'email' ] },
		{ name: 'ix_unique_username', unique: true, columns: [ 'username' ] },
	],
} );
