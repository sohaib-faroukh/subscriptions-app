import * as express from 'express';
import { Router } from 'express';
import { getAccounts, postAccount } from './server/routes/account.routes';
import { getEnvironment } from './server/environments/env.util';
import { cors } from './utils/cors.util';
import { googleCredentials } from './credentials';
import { db } from './utils/firebase.util';

// import { createConnection } from 'typeorm';

const env = process.argv?.includes( '--production' ) ? getEnvironment( 'prod' ) : getEnvironment();
const ANGULAR_DIST_FILES = env?.ANGULAR_DIST_FILES;
const PORT = env.PORT || 8081;
const credentials = googleCredentials;

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
	try {
		expressApp.listen( PORT, async () => {
			console.log( `\n***** THE APP IS RUNNING ON PORT #${ PORT } *****\n` );

			await db.app.auth().signInWithEmailAndPassword( credentials.email, credentials.password );
			console.log( `\n***** FIREBASE IS AUTHENTICATED *****\n` );

			const testRes = ( await db.ref( `first_ref` ).once( 'value' ) ).val();
			console.log( 'testRes :', JSON.stringify( testRes ) );


		} );

	} catch ( error ) {
		console.error( error );
		console.log( `\n***** FIREBASE IS NOT AUTHENTICATED *****\n`, JSON.stringify( error ) );
	}
};
bootstrapTheApp();

export const app = expressApp;


// export const app = FB_FUNC.https.onRequest( expressApp );


// Serve only the static files form the dist directory



// ! DB then listen
// DB.getInstance().then( c => {
// 	console.log( '***** The connection with db is created *****' );
// } )
// 	.catch( error => {
// 		console.error( error );
// 	} )
// 	.finally( () => {
// 		app.listen( port, () => {
// 			console.log( `***** THE APP IS RUNNING ON PORT #${ port } *****` );
// 		} );
// 	} );

