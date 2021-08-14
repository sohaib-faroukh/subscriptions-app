import { ConnectionOptions } from 'typeorm';

export const environment = {
	production: false,
	PORT: 8080,
	ANGULAR_DIST_FILES: {
		path: 'dist/subscriptions-web-ui',
		rootFile: 'index.html',
	},
	storageBucket: '',
	firebase: {
		apiKey: 'AIzaSyCRywAGSIRsV50pevaHGZR0AywhvZ5K3Yg',
		authDomain: 'subs-app-dev.firebaseapp.com',
		databaseURL: 'https://subs-app-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
		projectId: 'subs-app-dev',
		storageBucket: 'subs-app-dev.appspot.com',
		messagingSenderId: '844562369446',
		appId: '1:844562369446:web:a853348f4d02545a12dd67',
		measurementId: 'G-ZGBZNSN736',
	},
	// db: {
	// 	name: 'default',
	// 	type: 'postgres',
	// 	host: 'localhost',
	// 	port: 5432,
	// 	username: 'postgres',
	// 	password: 'postgres',
	// 	database: 'subscriptions-dev',
	// 	synchronize: true,
	// 	logger: 'debug',
	// 	entities: [
	// 		'server/entities',
	// 		'server/entities/**/*.ts',
	// 		'server/entities/**/*.js',
	// 	],
	// } as ConnectionOptions,
	db: {
		name: 'default',
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: 'mongodb+srv://sohaib:sohaib@cluster-sohaib-1.sbmtr.mongodb.net/subscriptions-dev?retryWrites=true&w=majority',
		synchronize: true,
		logger: 'debug',
		entities: [
			'server/entities',
			'server/entities/**/*.ts',
			'server/entities/**/*.js',
		],
	} as ConnectionOptions,
};
