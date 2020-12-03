import * as React from 'react';
import withEnhance from '../withEnhance';
import { IconProps } from '../types';

const SvgEditorOlRtl = (props: IconProps): JSX.Element => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' {...props}>
			<path d='M15 8.8c.1-.1.3-.1.4-.1.1 0 .3 0 .4.1.1.1.2.2.2.3 0 .1 0 .2-.1.3 0 .1-.1.2-.2.3l-.6.6-1 1v.7h2.8v-.7h-1.7l.5-.5.7-.7c.1-.1.2-.3.3-.5.1-.2.1-.3.1-.5s-.1-.4-.2-.6c-.1-.2-.3-.3-.4-.4-.2-.1-.4-.2-.7-.1-.2 0-.3 0-.5.1-.1 0-.3.1-.4.1-.2.1-.3.2-.5.4l.5.4c.1-.1.3-.2.4-.2zm1.7 6.5c-.2-.2-.5-.3-.7-.3.3-.1.5-.2.6-.4.2-.2.2-.4.2-.6 0-.3-.1-.6-.4-.7-.3-.2-.6-.3-1-.3-.5 0-.9.1-1.3.4l.4.6c.1-.1.3-.2.5-.2.1 0 .3-.1.4-.1.4 0 .6.2.6.5 0 .2-.1.3-.2.4-.2.1-.5.1-.7.1h-.3v.7h.3c.3 0 .5 0 .8.1.2.1.2.2.2.4s-.1.4-.2.5c-.2.1-.4.2-.6.2-.2 0-.4 0-.6-.1-.2 0-.4-.1-.5-.2v.7c.4.2.8.2 1.2.2.4 0 .9-.1 1.2-.3.3-.2.4-.6.4-.9 0-.3-.1-.5-.3-.7zM15 4.2c.1 0 .2-.1.3-.3V7h.8V3h-.7l-1.3 1 .4.5.5-.3zM4 6h9V5H4v1zm0 5h9v-1H4v1zm0 5h9v-1H4v1z' />
		</svg>
	);
};

export default withEnhance(SvgEditorOlRtl);
