import { MaterialSymbolProps } from 'atoms/material-symbol';

export type WidgetIdentifier = string;

export type WidgetInstanceId = string;

export interface WidgetInstance {
	guid: WidgetIdentifier;
	i: WidgetInstanceId;
	x: number;
	y: number;
	w: number;
	minW: number;
	h: number;
	minH: number;
	symbol: MaterialSymbolProps;
}

export interface WidgetManifest {
	guid: WidgetIdentifier;
	name: string;
	path: string;
	summary?: string;
	version?: string;
	author?: string;
	size?: {
		x?: number;
		minX?: number;
		y?: number;
		minY: number;
	};
	symbol?: MaterialSymbolProps;
}

export type WidgetRepository = Map<WidgetIdentifier, WidgetManifest>;

const __repository: WidgetRepository = new Map<
	WidgetIdentifier,
	WidgetManifest
>();

export function getRegisteredWidgets(): WidgetRepository {
	return __repository;
}

export function getWidgetManifest(
	guid: WidgetIdentifier
): WidgetManifest | undefined {
	return __repository.get(guid);
}

export async function loadWidgetManifest(
	path: string
): Promise<WidgetManifest> {
	return new Promise((resolve) => {
		import(`../../widgets/${path}/manifest.json`).then((data) =>
			resolve(data?.default)
		);
	});
}
export function registerWidget(manifest: WidgetManifest): void {
	if (!__repository.has(manifest.guid)) {
		__repository.set(manifest.guid, manifest);
	}
}

export function initializeWidget(manifest: WidgetManifest): WidgetInstance {
	return {
		guid: manifest.guid,
		i: `${manifest.guid}:${Date.now()}`,
		x: 0,
		y: Infinity,
		w: manifest?.size?.x ?? 2,
		minW: manifest?.size?.minX ?? 2,
		h: manifest?.size?.y ?? 2,
		minH: manifest?.size?.minY ?? 2,
		symbol: manifest?.symbol ?? {
			variant: 'widgets',
			weight: 300,
		},
	};
}
