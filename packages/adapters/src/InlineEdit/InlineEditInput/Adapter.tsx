import { Component } from '.';

import type { Props } from '.';

export const Adapter: ReactFC = (props) => {
	const newProps = legacyToNew(props);
	return <Component {...newProps} />;
};

type ReactFC = React.FC<Props>;
type Props = Props.Input & Props.Legacy.InlineEditInputProps;

function legacyToNew(props: Props): Props.Input {
	throw new Error('TODO:');
}
