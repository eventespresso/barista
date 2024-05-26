import { useMemo } from 'react';

import { InlineEdit } from '..';
import { convertProps } from './convertProps';

import type { Props } from '../InlineEdit';
import type { Component } from './types';

export const Adapter: Component.Type = (props) => {
	const newProps = useMemo<Props.Type>(() => convertProps(props), [props]);
	return <InlineEdit {...newProps} />;
};
