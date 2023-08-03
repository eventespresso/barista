import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs-extra';

/**
 * Recursively create directories if they do not exist
 * in the given path
 */
export function ensurePathExists(path: string): void {
	const target = resolve(path);
	if (!existsSync(target)) {
		mkdirSync(target, { recursive: true });
	}
}
