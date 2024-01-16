const InBrowser: boolean = typeof process !== 'object';

function ts(): string {
	return new Date().toLocaleTimeString();
}

export function raw(raw: unknown): void {
	if (InBrowser) {
		console.log(raw);
	} else {
		return console.log(`[${ts()}] ${raw}`);
	}
}

export function log(message: string): void {
	raw(`🪵  ${message}`);
}

export function error(error: Error | string): void {
	if (!(error instanceof Error)) {
		error = new Error(error);
	}

	raw(`🔥 <Error>: ${error.message}`);

	console.error(error);
}
