import { resolve } from 'path';
import { tmpdir } from 'os';

const locations = {
	manifests: resolve(__dirname, '.playwright', 'ddev'),
	containers: resolve(tmpdir(), 'ddev-containers'),
};

export const constants = { locations };
