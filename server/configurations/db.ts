
import { connect, connection, Connection } from 'mongoose';
import { getEnvironment } from '../environments/env.util';

export class DB {

	private static connection?: Connection = undefined;
	private static get URI (): string {
		const t = getEnvironment()?.db?.url || '';
		if ( !t ) throw new Error( 'No DB URL is provided' );
		return t;
	}

	public static getInstance = async (): Promise<Connection> => {
		if ( DB.connection ) return DB.connection;
		DB.connection = await DB.getDBConnection();
		return DB.connection;
	}

	private static createDBConnection = async (): Promise<Connection> => {
		const connectionConfigs = DB.URI;
		return new Promise<Connection>( async ( resolve, reject ) => {
			try {

				await connect( connectionConfigs, {
					useNewUrlParser: true,
					useFindAndModify: true,
					useUnifiedTopology: true,
					useCreateIndex: true,
				} );
				const mongoConnection = connection;

				mongoConnection.once( 'open', async () => {
					console.log( '**** MongoDB: Connected to database ****' );
				} );
				mongoConnection.on( 'error', () => {
					console.log( '**** MongoDB: Error connecting to database ****' );
				} );

				resolve( mongoConnection );
			} catch ( error ) {
				console.log( 'connection error happened...' );
				reject( error );
			}
		} );
	}
	private static getDBConnection = async () => {
		return await DB.createDBConnection();
	}


}

export const db = DB.getInstance();
