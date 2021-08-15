import * as express from 'express';
import { Router } from 'express';
import { getAccounts, postAccount } from './server/routes/account.routes';
import { getEnvironment } from './server/environments/env.util';
import { cors } from './utils/cors.util';
import { db } from './server/configurations/db';

// import { createConnection } from 'typeorm';

const env = process.argv?.includes( '--production' ) ? getEnvironment( 'prod' ) : getEnvironment();
const ANGULAR_DIST_FILES = env?.ANGULAR_DIST_FILES;
const PORT = env.PORT || 8081;


// Define the routes

const apiRoutes: Router = Router();

// Accounts routes
apiRoutes.route( '/api/accounts' ).get( getAccounts ).post( postAccount );

apiRoutes.route( '/*' ).get( ( req, res ) =>
	res.sendFile( ANGULAR_DIST_FILES.rootFile, { root: ANGULAR_DIST_FILES.path } )
);



// Bootstrapping the application
const expressApp = express();

expressApp.use( cors );
expressApp.use( express.static( ANGULAR_DIST_FILES.path ) );
expressApp.use( express.urlencoded( { limit: '200mb', extended: true } ) );
expressApp.use( express.json() );
// expressApp.use( errorHandler);
expressApp.use( apiRoutes );

const bootstrapTheApp = async () => {
	expressApp.listen( PORT, async () => {
		console.log( `\n***** THE APP IS RUNNING ON PORT #${ PORT } *****\n` );

		console.log( '( JSON.stringify(( await db ).collections ) : ' );

		// TODO: test mongo db
		// const d = ( await db ). );

	} );
};
bootstrapTheApp();

export const app = expressApp;
