import { CSSProperties, useCallback, useState } from 'react';

import { __ } from '@eventespresso/i18n';
import { Collapse } from '@eventespresso/adapters';
import { isDev } from '@eventespresso/constants';

import { Button } from '../Button';
import type { DebugInfoProps } from './types';

const style: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
};

const DebugInfo: React.FC<DebugInfoProps> = ({ buttonText, data, asJson = true, asCollapse = true }) => {
	const [show, setShow] = useState(false);

	// define it here to avoid conditional call of hook
	const handleToggle = useCallback(() => setShow((v) => !v), [setShow]);

	if (!isDev) {
		return null;
	}

	const dataToRender = asJson ? JSON.stringify(data, null, 2) : data;

	const output = <pre style={style}>{dataToRender}</pre>;

	if (!asCollapse) {
		return output;
	}

	let btnText = show ? __('Hide Debug Info') : __('Show Debug Info');
	btnText = buttonText || btnText;

	return (
		<>
			<Button className='ee-debug-info-btn' buttonText={btnText} onClick={handleToggle} />
			<Collapse isOpen={show}>{output}</Collapse>
		</>
	);
};

export default DebugInfo;
