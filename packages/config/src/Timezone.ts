import type { TimezoneProps } from '.';

export const Timezone = ({ city, name, offset }: TimezoneProps): TimezoneProps => {
	return {
		city: city || 'UTC',
		name: name || 'UTC',
		offset: offset || 0,
	};
};
