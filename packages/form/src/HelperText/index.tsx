import React from 'react';

import { FormHelperText, FormControlProps } from '@eventespresso/adapters';

import './style.scss';

export const HelperText: React.FC<FormControlProps> = React.memo(({ children, ...props }) => {
	return (
		<FormHelperText {...props} className='ee-form-helper-text'>
			{children}
		</FormHelperText>
	);
});
