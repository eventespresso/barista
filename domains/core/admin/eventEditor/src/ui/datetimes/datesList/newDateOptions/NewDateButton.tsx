import OptionsModalButton from './OptionsModalButton';
import { NewDateOptions } from '@eventespresso/edtr-services';
import { useConfig } from '@eventespresso/services';

const NewDateButton: React.FC = () => {
	const { isCaffeinated } = useConfig();
	return isCaffeinated ? (
		<NewDateOptions>
			{(fills) => {
				if (fills.length > 1) {
					return <OptionsModalButton>{fills}</OptionsModalButton>;
				}
				return <>{fills}</>;
			}}
		</NewDateOptions>
	) : null;
};

export default NewDateButton;
