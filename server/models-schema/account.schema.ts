import { IAccount } from 'models/account';
import { Schema, Document, SchemaDefinition } from 'mongoose';
import * as mongoose from 'mongoose';
import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';


export interface IAccountDocument extends Document, Omit<IAccount, 'id'> { }

const AccountSchema = new Schema<IAccountDocument>( {

	id: { type: String, required: true, unique: true, default: uuid(), immutable: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: false },
	username: { type: String, required: false, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	token: { type: String, required: false },
	type: { type: String, required: true, enum: [ 'corporate', 'personal' ] },
	lastLoginAt: { type: String, required: false },
	isCorporate: { type: Boolean, required: false },
	createdBy: { type: String, required: false },
	createdAt: { type: String, required: true, default: getCurrent(), immutable: true },
	updatedAt: { type: String, required: false },

} as SchemaDefinition, { collection: 'accounts' } );

// TODO: we may need to fix mongoose installation
export const AccountModel = mongoose.model<IAccount>( 'Accounts', AccountSchema as any );
