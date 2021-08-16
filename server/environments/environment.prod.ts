export const environment = {
	production: true,
	PORT: process.env.PORT || 8080,
	ANGULAR_DIST_FILES: {
		path: 'subscriptions-web-ui',
		rootFile: 'index.html',
	},
	db: {
		name: 'default',
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: process.env.MONGO_DB_URL,
	},
};
