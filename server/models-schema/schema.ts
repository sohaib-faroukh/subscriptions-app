import { EntitySchemaColumnOptions } from 'typeorm';



export const BaseColumnSchemaPart = {
	id: {
		name: 'id',
		type: 'uuid',
		primary: true,
		objectId: true,
	} as EntitySchemaColumnOptions,
	createdAt: {
		name: 'created_at',
		type: 'timestamp with time zone',
		createDate: true,
	} as EntitySchemaColumnOptions,
	updatedAt: {
		name: 'updated_at',
		type: 'timestamp with time zone',
		updateDate: true,
	} as EntitySchemaColumnOptions,
};

