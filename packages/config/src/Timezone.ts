import type { TimezoneProps } from './types';

export const Timezone = (props?: Partial<TimezoneProps>): TimezoneProps => {
	return {
		...defaultTimezone,
		...props,
	};
};

const defaultTimezone: TimezoneProps = {
	city: 'UTC',
	name: 'UTC',
	offset: 0,
};
