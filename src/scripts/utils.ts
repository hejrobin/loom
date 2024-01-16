import { Glob } from 'bun';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname } from 'path';

import * as logger from 'pkg/logger';

const shell = promisify(exec);

export function parseArguments(): string[] {
	return Bun.argv.slice(2);
}

export function toSnakeCase(raw: string): string {
	return raw
		.trim()
		.replace(/\.?([A-Z]+)/g, (_, match) => `_${match.toLocaleLowerCase()}`)
		.replace(/^_/, '');
}

export function toCamelCase(raw: string): string {
	return raw.trim().replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
}

export function toPascalCase(raw: string): string {
	raw = toCamelCase(raw);

	return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function isPascalCase(raw: string): boolean {
	return !!raw.match(/^[A-Z][a-z0-9]*(?:[A-Z][a-z0-9]*)*(?:[A-Z]?)$/);
}

export interface UserIdentity {
	name: string;
	email: string;
}

export async function getUserIdentity(): Promise<UserIdentity> {
	const nameOutput = await shell('git config --global user.name');
	const emailOutput = await shell('git config --global user.email');

	return {
		name: nameOutput.stdout.trim() ?? `Unknown`,
		email: emailOutput.stdout.trim() ?? `unknown`,
	};
}

export async function updateWidgetRepository() {
	try {
		const widgets: string[] = [];

		const glob = new Glob('**/manifest.json');

		for await (const file of glob.scan({
			cwd: './src/widgets',
			onlyFiles: false,
		})) {
			widgets.push(dirname(file));
		}

		const didUpdateWidgets = await Bun.write(
			`./src/widgets/repository.json`,
			JSON.stringify(widgets, null, '	')
		);

		if (didUpdateWidgets === 0) {
			throw new Error(
				`Could not widget repository. Do you have write access to src/widgets?`
			);
		}
	} catch (error: unknown) {
		logger.error(error as Error);
	}
}
