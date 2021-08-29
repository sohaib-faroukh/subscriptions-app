import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';
import { FileModel, IFileDocument } from '../models-schema/file.schema';

export class FileRepo {
	static model = FileModel;

	static find = async ( filters?: any ) => {
		return ( await FileRepo.model.find( filters ) );
	}

	static findOne = async ( filters?: any ) => {
		return ( await FileRepo.model.findOne( filters ) );
	}
	static findAll = async ( filters?: any ) => {
		return ( await FileRepo.model.find( filters ) );
	}
	static findById = async ( id: string ) => {
		return ( await FileRepo.model.findById( id ) );
	}

	static insert = async ( data: IFileDocument ): Promise<IFileDocument> => {
		const ID = uuid();
		const current = getCurrent();
		const newFile = new FileModel( {
			id: data?.id || ID,
			name: data.name,
			path: data.path,
			status: data?.status || 'empty',
			mediaType: data?.mediaType || data?.type || '',
			type: data?.type || data?.mediaType || '',
			owner: data?.owner || '',
			size: data?.size || 0,
			lastModifiedDate: data?.lastModifiedDate || current,
			createdBy: ID,
			createdAt: current,
			updatedAt: current,
		} );

		return await newFile.save().catch( e => { throw e; } );

	}

}

