declare global {
	type JSONPrimitive = string | number | boolean | null;
	type JSONValue = JSONPrimitive | JSONObject | JSONValue[];
	type JSONObject = JSONValue[] | { [member: string]: JSONValue };

	type Nullable<T> = T | null;
}

declare module '*.json' {
	const value: any;
	export default value;
}
