import type { Meta } from '@storybook/react/types-6-0';
import { CSSProperties } from 'react';

import * as Icons from './icons';

export default {
	component: () => null,
	title: 'Components/AllIcons',
} as Meta;

const wrapperStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
};

const iconBoxStyle: CSSProperties = {
	border: '1px solid #d6d6d6',
	height: '110px',
	width: '110px',
	overflow: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-around',
	margin: '0.5em',
};

export const Default = () => (
	<div style={wrapperStyle}>
		{Object.entries(Icons).map(([name, Component]) => (
			<div key={name} style={iconBoxStyle} className='icon-box'>
				<Component viewBox='0 0 24 24' />
				<p>{name}</p>
			</div>
		))}
	</div>
);
