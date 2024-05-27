import { useMemo } from 'react';

import { InlineEdit } from '../InlineEdit';
import { convertProps } from './convertProps';

import type { Props as InlineEditProps } from '../InlineEdit/types';
import type { Component } from './types';

export const Adapter = <T extends InlineEditProps.InputType>(props: Component.Props<T>) => {
	const newProps = useMemo<InlineEditProps.Type<T>>(() => convertProps(props), [props]);
	return <InlineEdit {...newProps} />;
};
