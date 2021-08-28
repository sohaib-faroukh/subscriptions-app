import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, param } from 'express-validator';
import { ISubscription } from '../../models/subscription';
import { ISubscriptionDocument } from '../../server/models-schema/subscription.schema';
import { SubscriptionRepo } from '../../server/repositories/subscriptions.repo';
import { getCurrent } from '../../utils/date';
import { QueryParam } from '../../utils/query-param';
import { requestResponder } from '../../utils/request-responder.util';
import { requestValidator } from '../../utils/request-validator.util';
import { uuid } from '../../utils/uuid';
import { getLoggedInAccount } from './account.routes';

export const getSubscriptions: RequestHandler[] = [

	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const defaultQueryParam = QueryParam.getDefault();
		const myQuery: Required<QueryParam> = {
			...QueryParam.getDefault(),
			take: req?.query?.take ? Number( req?.query?.take ) : defaultQueryParam?.take,
			start: req?.query?.start ? Number( req?.query?.start ) : defaultQueryParam?.start,
		} as Required<QueryParam>;

		const repo = ( await SubscriptionRepo.findAll() );
		const subscriptions: ISubscriptionDocument[] = repo || [];

		return subscriptions;

	} ),

];


export const postSubscription: RequestHandler[] = [
	body( 'secondParty' ).exists().bail().isString(),
	body( 'time' ).exists().bail().isString(),
	body( 'description' ).optional().isString(),
	body( 'repeat' ).exists().custom( ( e: string ) => [ 'daily', 'monthly', 'yearly' ].includes( e ) ),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		if ( !req?.headers?.authorization ) throw new Error( 'Please login' );

		const payload = req?.body as Partial<ISubscription>;
		const current = getCurrent();


		const loggedInAccount = ( await getLoggedInAccount( req.headers.authorization ) );
		if ( !loggedInAccount ) throw new Error( 'Please login' );

		payload.firstParty = loggedInAccount.id || '';
		payload.id = uuid();
		payload.createdBy = loggedInAccount.id || '';
		payload.createdAt = current;
		payload.updatedAt = current;

		const newSubscription: ISubscriptionDocument = payload as ISubscriptionDocument;

		const result = ( await SubscriptionRepo.insert( newSubscription ) ) || null;

		return result;

	} ),

];


export const deleteSubscription: RequestHandler[] = [
	param( 'id' ).exists().bail().isString(),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		if ( !req?.headers?.authorization ) throw new Error( 'Please login' );
		const { id } = req.params;

		const subscription = await SubscriptionRepo.findOne( { id } );
		if ( !subscription ) throw new Error( 'subscriptions is not exist' );

		await SubscriptionRepo.delete( id );
		return subscription;

	} ),

];
