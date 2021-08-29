import { IIdentityWithLogInfo } from './generics/IdentityWithLogInfo';

export type FileStatus = 'empty' | 'uploading' | 'error' | 'uploaded' | 'removed';
export interface IFile extends IIdentityWithLogInfo {
	name: string;
	path: string;
	status?: FileStatus;
	mediaType?: string;
	size?: number;
	lastModifiedDate?: string;
	type?: string;
	owner?: string;
}
