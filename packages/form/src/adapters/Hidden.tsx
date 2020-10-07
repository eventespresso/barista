import React from 'react';

import withoutMeta from './withoutMeta';
import type { FieldRendererProps } from '../types';

const Hidden: React.FC<FieldRendererProps> = ({ input, ...props }) => {
	return <input {...input} {...props} type='hidden' />;
};

export default withoutMeta(Hidden);
