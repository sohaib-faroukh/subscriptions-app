export const environment = {
	production: false,
	PORT: 8080,
	ANGULAR_DIST_FILES: {
		path: 'dist/subscriptions-web-ui',
		rootFile: 'index.html',
	},
	storageBucket: '',
	db: {
		name: 'default',
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: 'mongodb+srv://sohaib:sohaib@cluster-sohaib-1.sbmtr.mongodb.net/subscriptions-dev?retryWrites=true&w=majority',
	},
};
