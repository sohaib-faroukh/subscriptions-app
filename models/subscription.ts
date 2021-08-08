
import { IdentityWithLogInfo } from './generics/IdentityWithLogInfo';

export class Subscription extends IdentityWithLogInfo {
	description?: string;
	firstParty: string = '';
	secondParty: string = '';

}
