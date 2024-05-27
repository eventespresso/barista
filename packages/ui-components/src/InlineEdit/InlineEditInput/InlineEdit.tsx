import classNames from 'classnames';

import { InlineEdit as InlineEditAdapter } from '@eventespresso/adapters';

import type { InlineEditProps } from '@eventespresso/adapters';

import './style.scss';

const InlineEdit: React.FC<InlineEditProps> = (props) => {
	const inputClassName = classNames('ee-inline-edit', props.inputClassName);

	return (
		<InlineEditAdapter {...props} editableInputClassName='ee-inline-edit__input' inputClassName={inputClassName} />
	);
};

export default InlineEdit;
