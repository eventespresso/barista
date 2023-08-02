import { resolve } from 'path';
import { tmpdir } from 'os';

const base = resolve(__dirname, '.playwright');

const locations = {
	playwright: base,
	manifests: resolve(base, 'ddev'),
	containers: resolve(tmpdir(), 'ddev'),
};

export const constants = { locations };
