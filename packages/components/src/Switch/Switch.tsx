import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { SwitchChecked, SwitchUnchecked } from '@eventespresso/icons';
import { isLeftKey, isRightKey } from '@eventespresso/utils';
import { useOnChange } from '@eventespresso/hooks';
import { withLabel } from '../withLabel';
import type { SwitchProps } from './types';

import './style.scss';

const icons = {
	checked: <SwitchChecked />,
	unchecked: <SwitchUnchecked />,
};

const Switch: React.FC<SwitchProps> = ({
	checked,
	defaultChecked,
	disabled,
	onBlur,
	onChange,
	onChangeValue,
	onFocus,
	value,
	...props
}) => {
	const [innerChecked, setInnerChecked] = useState<boolean>(checked || defaultChecked);
	const [hasFocus, setHasFocus] = useState<boolean>(false);
	const ref = useRef<HTMLInputElement>();
	const onChangeHandlerArg = useMemo(() => ({ onChange, onChangeValue }), [onChange, onChangeValue]);
	const onChangeHandler = useOnChange(onChangeHandlerArg);

	const touch = useRef({
		activated: false,
		moved: false,
		previouslyChecked: Boolean(checked || defaultChecked),
		startX: null,
	});

	const className = classNames(
		'ee-switch',
		{
			'ee-switch--checked': innerChecked,
			'ee-switch--focus': hasFocus,
			'ee-switch--disabled': disabled,
		},
		props.className
	);

	const handleBlur = useCallback<SwitchProps['onBlur']>(
		(event) => {
			onBlur?.(event);

			setHasFocus(false);
		},
		[onBlur]
	);

	const handleFocus = useCallback<SwitchProps['onFocus']>(
		(event) => {
			onFocus?.(event);

			setHasFocus(true);
		},
		[onFocus]
	);

	const onClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
			if (disabled) {
				return;
			}

			const checkbox = ref.current;

			if (e.target !== checkbox && !touch.current.moved) {
				touch.current.previouslyChecked = checkbox.checked;
				e.preventDefault();
				checkbox.focus();
				checkbox.click();
				return;
			}

			setInnerChecked(checked ? checked : checkbox.checked);
		},
		[checked, disabled]
	);

	const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (isLeftKey(e)) {
			setInnerChecked(false);
		}

		if (isRightKey(e)) {
			setInnerChecked(true);
		}
	}, []);

	return (
		<div
			aria-checked={innerChecked}
			className={className}
			onClick={onClick}
			onKeyDown={onKeyDown}
			role='checkbox'
			tabIndex={0}
		>
			<div className='ee-switch-track'>
				<div className='ee-switch-track-check'>{icons.checked}</div>
				<div className='ee-switch-track-x'>{icons.unchecked}</div>
			</div>
			<div className='ee-switch-thumb' />

			<input
				{...props}
				aria-checked={innerChecked}
				checked={innerChecked}
				className='ee-switch__sr-only'
				onBlur={handleBlur}
				onChange={onChangeHandler}
				onFocus={handleFocus}
				ref={ref}
				type='checkbox'
				value={value}
			/>
		</div>
	);
};

export default withLabel(Switch);
