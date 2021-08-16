export const environment = {
	production: false,
	PORT: process.env.PORT || 8080,
	ANGULAR_DIST_FILES: {
		path: 'dist/subscriptions-web-ui',
		rootFile: 'index.html',
	},
	auth: {
		secret: process.env.JWT_SECRET,
		jwtTokenLifeTime: '100',
	},
	storageBucket: '',
	db: {
		name: 'default',
		type: 'mongodb',
		database: 'subscriptions-dev',
		url: process.env.MONGO_DB_URL,
	},
};
