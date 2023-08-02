import R from 'ramda';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

/**
 * Make given string compatible with Linux/Unix filesystems
 * by replacing spaces with dashes and removing special characters
 */
export function sanitizeStr(raw: string): string {
	const lowerCase = (input: string): string => {
		return input.toLowerCase();
	};
	const spacesToDashes = (input: string): string => {
		return input.replaceAll(' ', '-');
	};
	const stripIllegalChars = (input: string): string => {
		return input.replaceAll(/[^\w\-\d]/g, '');
	};
	const fnc: R.PipeWithFns<string, string> = [lowerCase, spacesToDashes, stripIllegalChars];
	const pipe = R.pipeWith((f, res) => f(res));
	return pipe(fnc)(raw);
}

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
