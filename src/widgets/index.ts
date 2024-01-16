import { loadWidgetManifest, registerWidget } from 'pkg/widget';

import availableWidgets from './repository.json';

function loadWidgets() {
	availableWidgets.forEach(async (widgetPath: string) => {
		const manifest = await loadWidgetManifest(widgetPath);

		registerWidget(manifest);
	});
}

loadWidgets();
