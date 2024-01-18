export {};
// @note Export is needed https://github.com/microsoft/TypeScript/issues/19816#issuecomment-640263670

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
