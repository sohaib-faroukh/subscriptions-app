export const environment = {
	production: false,
	PORT: process.env.PORT || 8080,
	ANGULAR_DIST_FILES: {
		path: 'dist/subscriptions-web-ui',
		rootFile: 'index.html',
	},
	storageBucket: '',
	db: {
		name: 'default',
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: '',
	},
};
