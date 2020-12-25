import { Switch } from '@eventespresso/ui-components';

import withoutMetaProp from './withoutMetaProp';
import type { FieldRendererProps } from '../types';

const SwitchField: React.FC<FieldRendererProps> = ({ input, ...props }) => {
	return <Switch {...input} isChecked={Boolean(input.value)} {...props} label={null} />;
};

export default withoutMetaProp(SwitchField);
