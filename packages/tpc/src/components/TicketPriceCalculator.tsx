import { hasPrices, priceTypeHasPriceModifiers } from '@eventespresso/predicates';
import { ButtonRow, DebugInfo } from '@eventespresso/ui-components';

import DefaultPricesInfo from './DefaultPricesInfo';
import DefaultTaxesInfo from './DefaultTaxesInfo';
import LockedTicketsBanner from './LockedTicketsBanner';
import NoPricesBanner from './NoPricesBanner';
import NoPriceTypesBanner from './NoPriceTypesBanner';
import Table from './table/Table';
import DeleteAllPricesButton from '../buttons/DeleteAllPricesButton';
import TaxesButtons from '../buttons/taxes/TaxesButtons';
import { useDataState } from '../data';
import { useInitStateListeners } from '../stateListeners';
import { usePricesPolling } from '../hooks';

import './styles.scss';

export interface TicketPriceCalculatorProps {
	context?: 'standalone' | 'editTicketForm';
}

const TicketPriceCalculator: React.FC<TicketPriceCalculatorProps> = ({ context }) => {
	// initialize state listeners
	useInitStateListeners();
	usePricesPolling();

	const dataState = useDataState();

	if (!hasPrices(dataState.prices)) {
		return (
			<>
				<NoPricesBanner context={context} />
				<DebugInfo data={dataState} />
			</>
		);
	}

	const missingPriceTypes =
		!Array.isArray(dataState.priceTypes) ||
		dataState.priceTypes.length === 0 ||
		!priceTypeHasPriceModifiers(dataState.priceTypes);

	return (
		<>
			{missingPriceTypes && <NoPriceTypesBanner />}
			<LockedTicketsBanner />
			<Table prices={dataState.prices} />
			<DefaultTaxesInfo />

			{!dataState.isDisabled && (
				<ButtonRow fullWidth>
					<DefaultPricesInfo />
					<TaxesButtons />
					<DeleteAllPricesButton />
				</ButtonRow>
			)}
			<DebugInfo data={dataState} />
		</>
	);
};

export default TicketPriceCalculator;
