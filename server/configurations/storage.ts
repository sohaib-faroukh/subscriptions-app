import { diskStorage } from 'multer';
import { getEnvironment } from '../environments/env.util';
import { Request } from 'express';
import { FileNameHandler } from '../../utils/file-name.util';
import { uuid } from '../../utils/uuid';
import { existsSync, mkdirSync } from 'fs';


const dest = getEnvironment().storageBucket;
export const storageConfig = diskStorage(
	{
		destination: ( (
			req: Request,
			file: Express.Multer.File,
			cb: ( error: Error | null, destination: string ) => void
		) => {
			if ( !existsSync( dest ) ) {
				mkdirSync( dest );
			}
			cb( null, dest );
		} ),
		filename: (
			(
				req: Request,
				file: Express.Multer.File,
				cb: ( error: Error | null, filename: string ) => void
			) => {
				const name = FileNameHandler.combineFileName( uuid(), file.originalname );
				cb( null, name );
			}
		),
	} );
