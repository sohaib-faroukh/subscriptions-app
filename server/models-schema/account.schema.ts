import { IAccount } from 'models/account';
import { Schema, Document, SchemaDefinition } from 'mongoose';
import * as mongoose from 'mongoose';


interface IAccountDocument extends Document, Omit<IAccount, 'id'> { }

const AccountSchema = new Schema<IAccountDocument, IAccount>( {

	firstName: { type: String, required: true },
	lastName: { type: String, required: false },
	username: { type: String, required: false, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	token: { type: String, required: false },
	type: { type: String, required: true, enum: [ 'corporate', 'personal' ] },
	lastLoginAt: { type: String, required: false },
	isCorporate: { type: Boolean, required: false },
} as SchemaDefinition, { collection: 'accounts' } );

// TODO: we may need to fix mongoose installation
export const AccountModel = mongoose.model<IAccount>( 'Accounts', AccountSchema as any );
