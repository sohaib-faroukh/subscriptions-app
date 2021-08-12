
import { environment } from '../environments/environment';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import 'reflect-metadata';

export class DB {

	private static connection: Connection | null;


	public static getInstance = async (): Promise<Connection> => {
		if ( DB.connection ) return DB.connection;
		DB.connection = await DB.getDBConnection();
		return DB.connection;
	}

	private static createDBConnection = async () => {
		const connectionConfigs = environment.db as ConnectionOptions;
		return new Promise<Connection>( async ( resolve, reject ) => {
			try {
				const conn = await createConnection( connectionConfigs/*connectionConfigs*/ );
				resolve( conn );
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
