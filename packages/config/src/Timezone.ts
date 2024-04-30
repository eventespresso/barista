import type { Type } from '.';

export const Timezone = (config?: Partial<Type.Timezone>): Type.Timezone => ({
	city: config?.city ?? 'UTC',
	name: config?.name ?? 'UTC',
	offset: config?.offset ?? 0,
});
