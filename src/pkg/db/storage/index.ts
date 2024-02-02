import PouchDB from 'pouchdb';
import { useCallback, useMemo } from 'react';

export interface Model {
	_id?: string;
	_rev?: string;
}

interface UnknownModel extends Model {
	[key: string]: unknown;
}

interface Storage<T> {
	find: (id: string) => Promise<T>;
	findAll: () => Promise<[number, T[]]>;
	save: (modelId: string, model: T) => Promise<T>;
}

export function useStorage<T extends Model | UnknownModel>(
	database: string,
	options?: PouchDB.Configuration.DatabaseConfiguration
): Storage<T> {
	const databaseConnection = useMemo(
		() => new PouchDB<T>(database, options),
		[database, options]
	);

	/**
	 *	Attempts to find a document based on it's document ID.
	 *
	 *	@returns Promise<T>
	 */
	const find = useCallback(
		async (documentId: string): Promise<T> => {
			try {
				const result = await databaseConnection.get<T>(documentId);

				return result as unknown as T;
			} catch (error: unknown) {
				return Promise.reject(error);
			}
		},
		[databaseConnection]
	);

	/**
	 *	Attempts to find all documents in database. Returns array where the first item is the count, and the second is a list of documents.
	 *
	 *	@returns Promise<[number, T[]]>
	 */
	const findAll = useCallback(async (): Promise<[number, T[]]> => {
		try {
			const rows = await databaseConnection.allDocs<T>({
				include_docs: true,
			});

			const count: number = rows?.total_rows ?? 0;
			const result: T[] = [];

			if (count > 0) {
				rows?.rows.forEach(({ doc }) => result.push(doc as T));
			}

			return Promise.resolve([count, result]);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}, [databaseConnection]);

	/**
	 *	Saves a new or updates an existing model.
	 *
	 *	@param modelId string
	 *	@param model T
	 *
	 *	@return Promise<T>
	 */
	const save = useCallback(
		async (modelId: string, model: Partial<T>): Promise<T> => {
			try {
				const existing = await databaseConnection.get(modelId);

				console.log({ existing, modelId });

				if (existing) {
					if (existing._id !== modelId) {
						throw new Error('Model ID mismatch!');
					}

					model = { ...existing, ...model };
				}
			} catch (error: unknown) {
				if ((error as PouchDB.Core.Error).name !== 'not_found') {
					throw error;
				}
			} finally {
				if (!model._id) {
					model._id = modelId;
				}

				await databaseConnection.put(model as T);
			}

			return await find(modelId);
		},
		[databaseConnection, find]
	);

	return {
		find,
		findAll,
		save,
	};
}
