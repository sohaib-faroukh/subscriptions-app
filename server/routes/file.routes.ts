import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, param } from 'express-validator';
import { IFile } from '../../models/file';
import { getCurrent } from '../../utils/date';
import { fileUploader, FileUploaderFieldName } from '../../utils/file-uploader.util';
import { QueryParam } from '../../utils/query-param';
import { requestResponder } from '../../utils/request-responder.util';
import { requestValidator } from '../../utils/request-validator.util';
import { uuid } from '../../utils/uuid';
import { IFileDocument } from '../models-schema/file.schema';
import { FileRepo } from '../repositories/file.repo';
import { getLoggedInAccount } from './account.routes';

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

/**
 * post and upload file API
 */
export const postFile: RequestHandler[] = [
	fileUploader.single( FileUploaderFieldName ),
	body( 'refPath' ).optional().isString(),
	body( 'lastModifiedDate' ).optional().isString(),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		if ( !req?.headers?.authorization ) throw new Error( 'Not authorized' );

		const payload = req?.body as Partial<IFile>;
		const current = getCurrent();
		const loggedInAccount = await getLoggedInAccount( req.headers.authorization );
		if ( !loggedInAccount ) throw new Error( 'The logged in account is not found' );

		// get file  path form req.file
		if ( !req.file ) throw new Error( 'No file is provided' );
		const myFile = req.file;


		const myData: IFile = {
			id: uuid(),
			createdAt: current,
			updatedAt: current,
			createdBy: loggedInAccount?.id || '',
			owner: loggedInAccount?.id || '',
			refPath: payload?.refPath || '',
			lastModifiedDate: payload?.lastModifiedDate || current,
			status: 'uploaded',
			/* from the attached file  */
			name: myFile?.originalname || '', /* for view on screen*/
			path: myFile?.path || '',
			mediaType: myFile?.mimetype || '',
			size: myFile?.size || 0,
		};


		const newRecord: IFileDocument = myData as IFileDocument;

		const result = ( await FileRepo.insert( newRecord ) ) || null;

		return result;

	} ),

];




/**
 * delete a file API
 */
export const deleteFile: RequestHandler[] = [
	param( 'id' ).exists().bail().isString(),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const id: string = req.params.id || '';
		if ( !id ) throw new Error( 'Id is empty' );

		if ( !req?.headers?.authorization ) throw new Error( 'Not authorized' );

		const myFile = ( await FileRepo.findOne( { id } ) ) || null;
		if ( !myFile ) throw new Error( 'File not found' );

		const loggedInAccount = ( await getLoggedInAccount( req.headers.authorization ) );
		if ( !loggedInAccount ) throw new Error( 'You user is not found' );

		if ( myFile.owner !== loggedInAccount?.id ) throw new Error( 'You user is not authorized to delete this file' );


		await FileRepo.delete( id );

		return myFile;

	} ),

];

