import * as jwt from 'jsonwebtoken';
import { getEnvironment } from '../server/environments/env.util';
import { IAccountDocument } from '../server/models-schema/account.schema';

const settings = getEnvironment().auth;
const secret = settings.secret || 'not secure secret';
const jwtTokenLifeTime = settings.jwtTokenLifeTime;

export const generateAuthToken = ( payload: IAccountDocument ) => {
	return jwt.sign( payload, secret, {
		expiresIn: `${ jwtTokenLifeTime }d`,
		subject: 'user-token',
		algorithm: 'HS256',
	} );
};

export const verifyAuthToken = ( idToken: string ): IAccountDocument | null => {
	try {
		return jwt.verify( idToken, secret ) as IAccountDocument;
	} catch ( err ) {
		console.error( err );
		return null;
	}
};
