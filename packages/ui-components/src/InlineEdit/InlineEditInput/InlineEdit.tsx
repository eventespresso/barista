import classNames from 'classnames';

import { InlineEdit as InlineEditAdapter } from '@eventespresso/adapters';

import type { InlineEditType } from '@eventespresso/adapters';

import './style.scss';

type Props = InlineEditType.Legacy.InlineEditProps;

const InlineEdit: React.FC<Props> = (props) => {
	const inputClassName = classNames('ee-inline-edit', props.inputClassName);

	return (
		<InlineEditAdapter {...props} editableInputClassName='ee-inline-edit__input' inputClassName={inputClassName} />
	);
};

export default InlineEdit;
