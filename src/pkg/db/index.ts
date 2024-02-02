import PouchDB from 'pouchdb';
import { useMemo } from 'react';

/**
 *	Generates an unique timestamp from UNIX epoc time and current exec time.
 *
 *	@returns string
 */
export function uniqueId(): string {
	return new Date()
		.getTime()
		.toString()
		.concat('.', performance.now().toString());
}

export function usePouch<T extends object>(
	database: string,
	options?: PouchDB.Configuration.DatabaseConfiguration
): PouchDB.Database<T> {
	return useMemo(() => new PouchDB<T>(database, options), [database, options]);
}
