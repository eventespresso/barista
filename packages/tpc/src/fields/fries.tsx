/* eslint-disable */

import React from 'react';
import { Factory } from './factory';
import type { Map } from './types-refactored';

// const fries = () => {
// 	type Element = React.ReactElement<Map['Select']['Props'], 'select'>;

// 	const Element: Element = factory('Select')({ name: '', 'aria-label': '' });

// 	return Element;
// };

const fries = () => {
	<Factory _type='Input' name='' aria-label='' maxLength={5} />;

	return (
		<Factory _type='Select' name='' aria-label='' multiple>
			<>1</>
			<>2</>
			<>3</>
		</Factory>
	);
};

export default fries;
