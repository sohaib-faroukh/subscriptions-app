import { environment } from './environment';
import { environment as prodEnvironment } from './environment.prod';

export const getEnvironment = () => {
	if ( process.env.NODE_ENV === 'production' ) {
		console.log( '***** PRODUCTION *****' );
		return prodEnvironment;
	}
	return environment;

};
