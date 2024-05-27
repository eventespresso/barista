import { convertInputType } from './convertInputType';
import { CreateInputProp as Type } from './types';

export const createInputProp = <T extends Type.InputType>({
	input,
	inputType: legacy,
}: Type.Parameters<T>): Type.Return<T> => {
	if (input) return input;

	const type: T = (legacy ? convertInputType(legacy) : 'text') as T;

	/**
	 * explanation as to why we need to type cast as opposed to TS inferring the type
	 * @link https://stackoverflow.com/a/72326483/4343719
	 */
	type Cast = Type.Return<T>;

	if (type === 'textarea') {
		const object: Type.Return<'textarea'> = {
			_type: 'textarea',
			setValue: () => {},
			onCancel: () => {},
		};

		return object as Cast;
	}

	const object: Type.Return<'text'> = { _type: 'text' };

	return object as Cast;
};
