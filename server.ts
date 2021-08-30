import * as express from 'express';
import { NextFunction, Router } from 'express';
import { getAccounts, isAccountAuth, postAccount, postLoginAccount } from './server/routes/account.routes';
import { getEnvironment } from './server/environments/env.util';
import { cors } from './utils/cors.util';
import { db } from './server/configurations/db';
import * as logger from 'morgan';
import { requestResponder } from './utils/request-responder.util';
import { deleteSubscription, getSubscriptions, postSubscription } from './server/routes/subscription.routes';
import { authorize } from './utils/auth.util';
import { geAccountFiles, postFile } from './server/routes/file.routes';



const env = process.argv?.includes( '--production' ) ? getEnvironment( 'prod' ) : getEnvironment();
const ANGULAR_DIST_FILES = env?.ANGULAR_DIST_FILES;
const STORAGE_DEST = getEnvironment().storageBucket;
const PORT = env.PORT || 8081;


// * Define the routes

const apiRoutesNotAuth: Router = Router();
const apiRoutes: Router = Router();


// * Accounts routes
apiRoutesNotAuth.route( '/api/auth/new' ).post( postAccount );
apiRoutesNotAuth.route( '/api/accounts/is-auth' ).get( isAccountAuth );
apiRoutesNotAuth.route( '/api/accounts/login' ).post( postLoginAccount );
apiRoutesNotAuth.route( '/api/accounts' ).post( postAccount );
apiRoutes.route( '/api/accounts' ).get( getAccounts );



// * Subscriptions routes
apiRoutes.route( '/api/subscriptions' ).get( getSubscriptions ).post( postSubscription );
apiRoutes.route( '/api/subscriptions/:id' ).delete( deleteSubscription );


// * Files routes
apiRoutes.route( '/api/files' ).get( geAccountFiles ).post( postFile );


// * Frontend application files
apiRoutes.route( '/*' ).get( ( req, res ) =>
	res.sendFile( ANGULAR_DIST_FILES.rootFile, { root: ANGULAR_DIST_FILES.path } )
);



// * Bootstrapping the application
const expressApp = express();

expressApp.use( express.static( ANGULAR_DIST_FILES.path ) );
expressApp.use( '/' + STORAGE_DEST, express.static( STORAGE_DEST ) );
expressApp.use( express.json() );
expressApp.use( express.urlencoded( { limit: '200mb', extended: true } ) );

expressApp.use( cors );
expressApp.use( logger( 'short' ) );
expressApp.use( apiRoutesNotAuth );
expressApp.use( '/api/*', requestResponder( authorize ) );
expressApp.use( apiRoutes );
expressApp.use( '', requestResponder( ( req: Request, res: Response, next: NextFunction ) => {
	throw new Error( 'Route is not implemented' );
} ) );


const bootstrapTheApp = async () => {
	expressApp.listen( PORT, async () => {
		console.log( `\n***** THE APP IS RUNNING ON PORT #${ PORT } *****\n` );

		console.log( '\n***** TEST DB *****\n' );

		await db.then( r => {
			console.log( `\n***** DB CONNECTED *****\n` );
		} ).catch( err => {
			console.log( `\n***** DB CONNECTION FAILED *****\n`, err );
		} );



		console.log( `\n***** DONE *****\n` );


	} );
};
bootstrapTheApp();

export const app = expressApp;
