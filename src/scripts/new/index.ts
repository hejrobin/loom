import fs from 'fs/promises';
import {
	getUserIdentity,
	isPascalCase,
	parseArguments,
	toSnakeCase,
	updateWidgetRepository,
} from 'scripts/utils';

import * as logger from 'pkg/logger';
import { WidgetManifest } from 'pkg/widget';

async function main(): Promise<void> {
	const [name] = parseArguments();

	try {
		if (!isPascalCase(name)) {
			throw new Error(`Unqualified widget name; Must be valid PascalCase.`);
		}

		if (name.length < 3) {
			throw new RangeError(
				`Unqualified widget name; Must be at least 3 characters.`
			);
		}

		const guid: string = [toSnakeCase(name), name].join('.');
		const path: string = toSnakeCase(name);
		const root: string = `./src/widgets/${path}`;

		if (await fs.exists(root)) {
			throw new Error(`Widget "${name}" already exists at: ${root}.`);
		}

		const user = await getUserIdentity();

		const manifest: WidgetManifest = {
			guid,
			name,
			path,
			version: '0.0.1',
			summary: `A short description of ${name}.`,
			author: `${user.name} <${user.email}>`,
		};

		const didWriteManifest = await Bun.write(
			`${root}/manifest.json`,
			JSON.stringify(manifest, null, '	')
		);

		if (didWriteManifest === 0) {
			throw new Error(
				`Could not create "${name}" (manifest.json). Do you have write access to src/widgets?`
			);
		}

		const didWriteEntry = await Bun.write(
			`${root}/index.tsx`,
			`export default function ${name}(): JSX.Element {
	return <p>${manifest.summary}</p>;
}`
		);

		if (didWriteEntry === 0) {
			throw new Error(
				`Could not create "${name}" (index.tsx). Do you have write access to src/widgets?`
			);
		}

		const didWriteSettings = await Bun.write(
			`${root}/settings.tsx`,
			`export default function ${name}Settings(): JSX.Element {
	return <p>${name} v${manifest.version} by ${manifest.author
		?.replace('<', '&lt;')
		.replace('>', '&gt;')}</p>;
}`
		);

		if (didWriteSettings === 0) {
			throw new Error(
				`Could not create "${name}" (settings.tsx). Do you have write access to src/widgets?`
			);
		}

		await updateWidgetRepository();

		logger.log(`Successfully created ${name} created in ${root}`);
	} catch (error: unknown) {
		logger.error(error as Error);
	}
}

await main();
