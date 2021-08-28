import { IMap } from '../models/generics/map';

export const arrayToMap = <T extends { id: string }> ( arr: T[] ): IMap<T> => {

	if ( !arr || arr?.length === 0 ) return {} as IMap<T>;

	return arr.reduce( ( map: IMap<T>, item: T ) => ( {
		...map,
		[ item.id ]: item,
	} ), {} as IMap<T> );
};


export const mapToArray = <T extends { id: string }> ( map: IMap<T> ): T[] => {
	if ( !map || map === {} ) return [];
	return Object.values( map ) || [];
};
