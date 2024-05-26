import { useMemo } from 'react';

import { InlineEdit } from '..';
import { convertProps } from './convertProps';

import type { Props as InlineEditProps } from '../InlineEdit';
import type { Component } from './types';

export const Adapter = <T extends InlineEditProps.InputType>(props: Component.Props<T>) => {
	const newProps = useMemo<InlineEditProps.Type<T>>(() => convertProps(props), [props]);
	return <InlineEdit {...newProps} />;
};
