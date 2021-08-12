import { ConnectionOptions } from 'typeorm';

export const environment = {
	production: false,
	PORT: 8080,
	db: {
		name: 'default',
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'postgres',
		database: 'subscriptions-dev',
		synchronize: true,
		logger: 'debug',
		entities: [
			'server/entities',
			'server/entities/**/*.ts',
		],
	} as ConnectionOptions,
};
