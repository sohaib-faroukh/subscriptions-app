export const fullName = ( firstName?: string, lastName?: string ) => {
	let result = '';
	if ( !firstName && !lastName ) return '';
	if ( firstName ) result += firstName;
	if ( lastName ) {
		if ( result ) result += ' ' + lastName;
		else result += lastName;
	}
	return result;
};

