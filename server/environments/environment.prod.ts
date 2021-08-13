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
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: 'mongodb+srv://sohaib:sohaib@cluster-sohaib-1.sbmtr.mongodb.net/sohaib-database?retryWrites=true&w=majority',
		synchronize: true,
		logger: 'debug',
		entities: [
			'server/entities',
			'server/entities/**/*.js',
		],
	} as ConnectionOptions,
};
