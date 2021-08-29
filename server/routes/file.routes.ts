import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body } from 'express-validator';
import { IFile } from 'models/file';
import { resolve } from 'path';
import { getEnvironment } from '../environments/env.util';
import { IFileDocument } from '../models-schema/file.schema';
import { getCurrent } from '../../utils/date';
import { FileNameHandler } from '../../utils/file-name.util';
import { QueryParam } from '../../utils/query-param';
import { requestResponder } from '../../utils/request-responder.util';
import { requestValidator } from '../../utils/request-validator.util';
import { uuid } from '../../utils/uuid';
import { FileRepo } from '../repositories/file.repo';
import { getLoggedInAccount } from './account.routes';

// TODO: create upload file API (it will be called after post API to store the file, then update the status of the file)

/**
 * GET api for get all files for admin
 */

export const geAllFiles: RequestHandler[] = [

	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const defaultQueryParam = QueryParam.getDefault();
		const myQuery: Required<QueryParam> = {
			...QueryParam.getDefault(),
			take: req?.query?.take ? Number( req?.query?.take ) : defaultQueryParam?.take,
			start: req?.query?.start ? Number( req?.query?.start ) : defaultQueryParam?.start,
		} as Required<QueryParam>;

		const repo = ( await FileRepo.findAll() );
		const result: IFileDocument[] = repo || [];
		return result;

	} ),

];

/**
 * GET api for get all files of an account
 */

export const geAccountFiles: RequestHandler[] = [

	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const defaultQueryParam = QueryParam.getDefault();
		const myQuery: Required<QueryParam> = {
			...QueryParam.getDefault(),
			take: req?.query?.take ? Number( req?.query?.take ) : defaultQueryParam?.take,
			start: req?.query?.start ? Number( req?.query?.start ) : defaultQueryParam?.start,
		} as Required<QueryParam>;

		const loggedInAccount = await getLoggedInAccount( req.headers.authorization );
		if ( !loggedInAccount ) throw new Error( 'The logged in account is not found' );

		const repo = ( await FileRepo.find( { owner: loggedInAccount.id } ) ) || [];
		const result: IFileDocument[] = repo || [];
		return result;

	} ),

];


export const postFile: RequestHandler[] = [
	body( 'name' ).exists().isString(),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		if ( !req?.headers?.authorization ) throw new Error( 'Not authorized' );

		const payload = req?.body as Partial<IFile>;
		const current = getCurrent();
		const loggedInAccount = await getLoggedInAccount( req.headers.authorization );
		if ( !loggedInAccount ) throw new Error( 'The logged in account is not found' );

		// set valid name & id
		const fileId = uuid();
		const fileName = FileNameHandler.combineFileName( fileId, payload?.name || '' ) || '';

		// build up the path of the file
		const dirPath = `${ getEnvironment().storageBucket }/` || 'accounts-files/';
		const filePath = resolve( dirPath, fileName ) || '';

		const myData: IFile = {
			id: fileId,
			createdAt: current,
			updatedAt: current,
			createdBy: loggedInAccount?.id || '',
			name: fileName,
			path: filePath,
			owner: loggedInAccount?.id || '',
			mediaType: payload?.mediaType || '',
			type: payload?.type || '',
			lastModifiedDate: payload?.lastModifiedDate || current,
			size: payload?.size || 0,
		};


		const newRecord: IFileDocument = myData as IFileDocument;

		const result = ( await FileRepo.insert( newRecord ) ) || null;

		return result;

	} ),

];
