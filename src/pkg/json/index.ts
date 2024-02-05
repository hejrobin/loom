import * as logger from 'pkg/logger';

export function parse<T = JSONObject>(unparsed: string): Nullable<T> {
	let parsed: T;

	if (!unparsed || unparsed === '{}') {
		return null;
	}

	try {
		parsed = JSON.parse(unparsed);
	} catch (e: unknown) {
		logger.error(e as Error);

		return null;
	}

	return parsed;
}

export function stringify<T extends object>(
	serializable: T,
	prettify: boolean = false
): string {
	let serialized: string = '';

	try {
		serialized = JSON.stringify(serializable, null, prettify ? '  ' : '');
	} catch (e: unknown) {
		logger.error(e as Error);
	}

	return serialized;
}
