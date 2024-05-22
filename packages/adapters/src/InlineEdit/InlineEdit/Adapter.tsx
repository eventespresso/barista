import { Component } from '.';

import type { Props } from '.';

export const Adapter: ReactFC = (props) => {
	const newProps = legacyToNew(props);
	return <Component {...newProps} />;
};

type ReactFC = React.FC<Props>;
type Props = Props.Legacy.InlineEditProps & Props.InlineEdit;

function legacyToNew(props: Props): Props.InlineEdit {
	throw new Error('TODO:');
}
