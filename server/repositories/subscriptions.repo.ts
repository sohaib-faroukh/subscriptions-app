import { ISubscriptionDocument, SubscriptionModel } from '../models-schema/subscription.schema';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';

export class SubscriptionRepo {
	static model = SubscriptionModel;

	static find = async ( filters?: any ) => {
		return ( await SubscriptionRepo.model.find( filters ) );
	}

	static findOne = async ( filters?: any ) => {
		return ( await SubscriptionRepo.model.findOne( filters ) );
	}
	static findAll = async ( filters?: any ) => {
		return ( await SubscriptionRepo.model.find( filters ) );
	}
	static findById = async ( id: string ) => {
		return ( await SubscriptionRepo.model.findById( id ) );
	}

	static insert = async ( data: ISubscriptionDocument ): Promise<ISubscriptionDocument> => {
		const currentTime = getCurrent();
		const newSubscription = new SubscriptionModel(
			{
				id: uuid(),
				createdAt: data.createdAt || currentTime,
				updatedAt: data.updatedAt || currentTime,
				description: data.description || '',
				firstParty: data.firstParty || '',
				secondParty: data.secondParty || '',
				createdBy: data.createdBy || '',
				count: data.count || 1,
				time: data.time || '',
				repeat: data.repeat || 'monthly',
				icon: data?.icon || '',
			} as any as ISubscriptionDocument
		);
		return await newSubscription.save().catch( e => { throw e; } );
	}

	static delete = async ( id: string ) => {
		return ( await SubscriptionRepo.model.deleteOne( { id } ) );
	}

}
