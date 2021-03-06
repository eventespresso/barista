import { is } from 'ramda';

export const camelToSnakeCase = (str: string): string => {
	return str
		.split(/(?=[A-Z])/)
		.map((x) => x.toLowerCase())
		.join('-');
};

export const generateId = (str: string): string => {
	return 'ee-' + str.replace(/\s+/g, '-').toLowerCase();
};

export const lcFirst = (str: string): string => {
	if (is(String, str)) {
		return str.charAt(0).toLowerCase() + str.substring(1);
	}

	return undefined;
};

export const ucFirst = (str: string): string => {
	if (is(String, str)) {
		return str.charAt(0).toUpperCase() + str.substring(1);
	}

	return undefined;
};
