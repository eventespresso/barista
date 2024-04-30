import { Type } from '.';

export function BrandName(config?: Partial<Type.BrandName>): Type.BrandName {
	return config ?? 'Event Espresso';
}
