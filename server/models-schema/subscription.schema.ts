import { Schema, Document, SchemaDefinition } from 'mongoose';
import * as mongoose from 'mongoose';
import { ISubscription } from 'models/subscription';
import { BasicSchema } from './basic.schema';



export interface ISubscriptionDocument extends Document, Omit<ISubscription, 'id'> { }

const SubscriptionSchema = new Schema<ISubscriptionDocument>( {

	...BasicSchema,
	firstParty: { type: String, required: true },
	secondParty: { type: String, required: true },
	time: { type: String, required: true },
	description: { type: String, required: false },
	repeat: { type: String, required: true, enum: [ 'daily', 'monthly', 'yearly' ] },

} as SchemaDefinition, { collection: 'subscriptions' } );

export const SubscriptionModel = mongoose.model<ISubscription>( 'Subscriptions', SubscriptionSchema as any );
