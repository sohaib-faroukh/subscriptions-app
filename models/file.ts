import { IIdentityWithLogInfo } from './generics/IdentityWithLogInfo';

export interface IFile extends IIdentityWithLogInfo {
	name: string;
	path: '';
	mediaType?: string;
	size?: number;
	lastModifiedDate?: string;
	type?: string;
	owner?: string;
}
