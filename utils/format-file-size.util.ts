
const suffixes: string[] = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

export const formatSize = ( bytes: number ) => {
	const i = Math.floor( Math.log( bytes ) / Math.log( 1024 ) );
	return !bytes && '0 Bytes' || ( bytes / Math.pow( 1024, i ) ).toFixed( 2 ) + ' ' + suffixes[ i ];
};


