import type { Type } from '.';

export const Timezone = (config?: Partial<Type.Timezone>): Type.Timezone => ({
	...defaultTimezone,
	...config,
});

const defaultTimezone: Type.Timezone = {
	city: 'UTC',
	name: 'UTC',
	offset: 0,
};
