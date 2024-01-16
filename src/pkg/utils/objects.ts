/**
 *	Omits values by key in an object, works like TypeScript's Omit.
 *
 *	@param source object
 *	@param keys list of keys to pick
 *
 *	@return object
 */
export function omit<T extends object, K extends keyof T>(
	source: T,
	...keys: K[]
): Omit<T, K> {
	const result = Object.assign({}, source);

	keys.forEach((key) => delete result[key]);

	return result as unknown as Omit<T, K>;
}

/**
 *	Picks selected keys from source object, much like TypeScript's Pick
 *
 *	@param source object
 *	@param keys list of keys to pick
 *
 *	@returns object
 */
export function pick<T extends object, K extends keyof T>(
	source: T,
	...keys: K[]
): Pick<T, K> {
	return keys.reduce(
		(memo, key) => ({ ...memo, [key]: source[key] }),
		{}
	) as Pick<T, K>;
}

/**
 *	Behaves like array.map, but for objects without mutating the source object. This method is generic, where T is source type, R is return type.
 *
 *	@param source
 *	@param mutator
 *
 *	@example Uppercase all object values
 *	`map({ foo: 'foo' }, (value): string => value.toUpperCase())`
 *
 *	@returns object
 */
export function map<T extends object, R = T>(
	source: T,
	mutator: (value: T[keyof T], key: keyof T) => unknown
): R {
	return Object.keys(source).reduce(
		(target: R, key) => ({
			...target,
			[key]: mutator(source[key as keyof T], key as keyof T),
		}),
		{} as R
	);
}

/**
 *	Behaves like array.map, but for objects without mutating the source object.
 *
 *	@param source
 *	@param filter
 *
 *	@returns object
 */
export function filter<T extends object>(
	source: T,
	filter: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
	const result: Partial<T> = {};
	const from = Array.from(Object.entries(source)) as [keyof T, T[keyof T]][];

	from.forEach(([key, value]) => {
		if (filter(value, key)) {
			result[key] = value;
		}
	});

	return result;
}
