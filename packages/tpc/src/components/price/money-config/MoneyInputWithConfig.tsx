import { MoneyInputWrapper } from '@eventespresso/ui-components';
import { useConfig } from '@eventespresso/services';

import type { MoneyInputWrapperProps } from '@eventespresso/ui-components';

interface Props extends Omit<MoneyInputWrapperProps, 'sign' | 'signB4'> {}

// TODO: consolidate this

export const MoneyInputWithConfig: React.FC<Props> = (props) => {
	const { currency } = useConfig();

	return <MoneyInputWrapper {...props} sign={currency?.sign} signB4={currency?.signB4} />;
};
