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

	if (!dataState.prices?.length) {
		return (
			<>
				<NoPricesBanner context={context} />
				<DebugInfo data={dataState} />
			</>
		);
	}

	let missingPriceTypes = false;
	for (const price of dataState.prices) {
		if (!missingPriceTypes && !price.isBasePrice) {
			const hasPriceType = dataState.priceTypes.find((priceType) => {
				return !priceType.isBasePrice && priceType.dbId === price.dbId;
			});
			missingPriceTypes = !hasPriceType;
		}
	}

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
