import { Subscription } from 'models/subscription';
import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import { BaseColumnSchemaPart } from '../models-schema/schema';

export const SubscriptionEntity = new EntitySchema<Subscription>( {
	name: 'subscription',
	columns: {
		...BaseColumnSchemaPart,
		description: {
			name: 'description',
			type: 'text',
			nullable: true,
		} as EntitySchemaColumnOptions,
		firstParty: {
			name: 'first_party',
			type: 'text',
			nullable: false,
		} as EntitySchemaColumnOptions,
		secondParty: {
			name: 'second_party',
			type: 'text',
			nullable: false,
		} as EntitySchemaColumnOptions,
	},

	relations: {
		firstParty: {
			type: 'many-to-one',
			target: 'account',
			lazy: true,
			nullable: false,
		},
		secondParty: {
			type: 'many-to-one',
			target: 'account',
			lazy: true,
			nullable: false,
		},
	},
} );
