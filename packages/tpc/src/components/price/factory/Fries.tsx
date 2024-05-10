import { Factory } from '.';

// TODO: test code! remove!

export const Fries1 = () => {
	return (
		<Factory
			_type='Select'
			name='Fries'
			aria-label=''
			getValue={() => {
				throw new Error();
			}}
			setValue={(value) => {}}
			multiple
		/>
	);
};

export const Fries2 = () => {
	return (
		<Factory
			_type='Text'
			name='Fries'
			aria-label=''
			getValue={() => {
				throw new Error();
			}}
			setValue={(value) => {}}
			maxLength={5}
		/>
	);
};

export const Fries3 = () => {
	return (
		<Factory
			_type='Number'
			name='Fries'
			aria-label=''
			getValue={() => {
				throw new Error();
			}}
			setValue={(value) => {}}
		/>
	);
};
