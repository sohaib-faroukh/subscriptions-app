import { ConnectionOptions } from 'typeorm';

export const environment = {
	production: true,
	PORT: 8080,
	ANGULAR_DIST_FILES: {
		path: 'subscriptions-web-ui',
		rootFile: 'index.html',
	},
	db: {
		name: 'default',
		type: 'postgres',
		url: process.env.DATABASE_URL,
		synchronize: true,
		logger: 'debug',
		ssl: {
			ca: process.env.SSL_CERT,
		},
		extra: {
			ssl: true,
		},
		entities: [
			'server/entities',
			'server/entities/**/*.js',
		],
	} as ConnectionOptions,
};
