type ClassName = string | boolean | undefined;

export function classNames(...classNames: ClassName[]): string {
	return classNames.filter((n) => n).join(' ');
}
