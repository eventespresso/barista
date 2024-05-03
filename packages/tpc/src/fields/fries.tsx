import React from 'react';
import { Factory } from './factory';
import type { Map } from '.';

// const fries = () => {
// 	type Element = React.ReactElement<Map['Select']['Props'], 'select'>;

// 	const Element: Element = factory('Select')({ name: '', 'aria-label': '' });

// 	return Element;
// };

const fries = () => {
	return <Factory _type='Select' name='' aria-label='' />;
};

export default fries;
