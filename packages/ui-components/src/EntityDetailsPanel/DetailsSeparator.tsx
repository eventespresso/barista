import React from 'react';

import type { DetailsSeparatorProps } from './types';

const DetailsSeparator: React.FC<DetailsSeparatorProps> = ({ last = false }) =>
	!last && <div role='separator' className='ee-entity-details__separator'></div>;

export default DetailsSeparator;
