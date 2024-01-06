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
		y?: number;
	};
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

export function registerWidget(manifest: WidgetManifest): void {
	if (__repository.has(manifest.guid)) {
		throw new Error('Widget already registered.');
	} else {
		__repository.set(manifest.guid, manifest);
	}
}

export function instanciateWidget(manifest: WidgetManifest): WidgetInstance {
	return {
		guid: manifest.guid,
		i: `${manifest.guid}:${Date.now()}`,
		x: 0,
		y: Infinity,
		w: manifest?.size?.x ?? 2,
		minW: 2,
		h: manifest?.size?.y ?? 2,
		minH: 2,
	};
}
