export interface IIdentityWithLogInfo {
	id: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
}
export class IdentityWithLogInfo implements IIdentityWithLogInfo {
	id: string = '';
	createdAt: string = '';
	updatedAt: string = '';
	createdBy: string = '';
}
