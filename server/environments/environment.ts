import { ConnectionOptions } from 'typeorm';

// export const environment = {
// 	production: true,
// 	PORT: 8080,
// 	db: {
// 		name: 'default',
// 		type: 'postgres',
// 		host: 'ec2-54-90-211-192.compute-1.amazonaws.com' /* 'localhost' */,
// 		port: 5432,
// 		username: 'zrmqljheotuzhz' /* 'postgres' */,
// 		password: 'e81308a30e70a61f5f5bc0442aa9f7533c394a23203d445bc0f2e12d1dc7ac77' /* 'postgres' */,
// 		database: 'de0uu7hc0d5n07' /* 'subscriptions-dev' */,
// 		synchronize: true,
// 		logger: 'debug',
// 		entities: [
// 			'server/entities',
// 			'server/entities/**/*.ts',
// 			'server/entities/**/*.js',
// 		],
// 	} as ConnectionOptions,
// };

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
			'server/entities/**/*.js',
		],
	} as ConnectionOptions,
};
