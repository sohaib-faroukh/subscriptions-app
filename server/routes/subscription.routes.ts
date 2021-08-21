import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body } from 'express-validator';
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
	body( 'firstParty' ).exists().bail().isString(),
	body( 'secondParty' ).exists().bail().isString(),
	body( 'time' ).exists().bail().isString(),
	body( 'description' ).optional().isString(),
	body( 'repeat' ).exists().custom( ( e: string ) => [ 'daily', 'monthly', 'yearly' ].includes( e ) ),
	requestValidator,
	requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

		const payload = req?.body as Partial<ISubscription>;
		const current = getCurrent();

		payload.id = uuid();
		payload.createdBy = ( await getLoggedInAccount( req.headers.authorization ) )?.id || '';
		payload.createdAt = current;
		payload.updatedAt = current;

		const newSubscription: ISubscriptionDocument = payload as ISubscriptionDocument;

		const result = ( await SubscriptionRepo.insert( newSubscription ) ) || null;

		return result;

	} ),

];
