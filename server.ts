import * as express from 'express';
import { Router } from 'express';
import { getAccounts, postAccount } from './server/routes/account.routes';
import { DB } from './server/configurations/db';
import { getEnvironment } from './server/environments/env.util';

// import { createConnection } from 'typeorm';

const ANGULAR_DIST_FILES = getEnvironment()?.ANGULAR_DIST_FILES;
const port = getEnvironment().PORT || 8081;


// Define the routes

const apiRoutes: Router = Router();

// Accounts routes
apiRoutes.route( '/api/accounts' ).get( getAccounts ).post( postAccount );

apiRoutes.route( '/*' ).get( ( req, res ) =>
	res.sendFile( ANGULAR_DIST_FILES.rootFile, { root: ANGULAR_DIST_FILES } )
);



// Bootstrapping the application
const app = express();

app.use( express.static( ANGULAR_DIST_FILES.path ) );

app.use( express.urlencoded( { limit: '200mb', extended: true } ) );
app.use( express.json() );

app.use( apiRoutes );

// Serve only the static files form the dist directory



DB.getInstance().then( c => {

	console.log( '***** The connection with db is created *****' );

	app.listen( port, () => {
		console.log( `***** THE APP IS RUNNING ON PORT #${ port } *****` );
	} );

} );
