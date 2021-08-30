import * as multer from 'multer';
import { storageConfig } from '../server/configurations/storage';

export const FileUploaderFieldName = 'attachedFile';

export const fileUploader = multer( { storage: storageConfig } );
