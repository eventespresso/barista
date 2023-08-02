import { resolve } from 'path';

const locations = {
	manifests: resolve(__dirname, '.playwright', 'ddev'),
};

export const constants = { locations };
