import { Schema, Document, SchemaDefinition } from 'mongoose';
import * as mongoose from 'mongoose';
import { IFile } from 'models/file';
import { BasicSchema } from './basic.schema';




export interface IFileDocument extends Document, Omit<IFile, 'id'> { }

const FileSchema = new Schema<IFileDocument>( {

	...BasicSchema,
	name: { type: String, required: true },
	path: { type: String, required: true },
	status: { type: String, required: true, enum: [ 'empty', 'uploading', 'error', 'uploaded', 'removed' ] },
	owner: { type: String, required: false },
	mediaType: { type: String, required: false },
	type: { type: String, required: false },
	size: { type: Number, required: false },
	lastModifiedDate: { type: String, required: false },

} as SchemaDefinition, { collection: 'files' } );

export const FileModel = mongoose.model<IFile>( 'Files', FileSchema as any );

