import { loadWidgetManifest, registerWidget } from 'pkg/widget';

import availableWidgets from './repository.json';

export async function loadWidgets() {
	await Promise.all(
		availableWidgets.map(async (widgetPath: string) => {
			const manifest = await loadWidgetManifest(widgetPath);

			registerWidget(manifest);
		})
	);
}

loadWidgets();
