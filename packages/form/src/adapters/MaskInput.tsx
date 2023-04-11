import { MaskInput } from '@eventespresso/ui-components';

import type { FieldRendererProps } from '../types';

interface WithInputMaskProps {
	mask: string;
	label?: string;
}

const FormMaskInput: React.FC<FieldRendererProps & WithInputMaskProps> = ({ input, ...props }) => {
	return <MaskInput {...input} {...props} />;
};

export default FormMaskInput;
