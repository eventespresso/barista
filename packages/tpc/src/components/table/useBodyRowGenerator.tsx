import { useCallback } from 'react';

import PriceAmountInput from '../../inputs/PriceAmountInput';
import PriceDescriptionInput from '../../inputs/PriceDescriptionInput';
import PriceOrderInput from '../../inputs/PriceOrderInput';
import PriceIdInput from '../../inputs/PriceIdInput';
import PriceNameInput from '../../inputs/PriceNameInput';
import PriceModifierActions from '../../buttons/PriceModifierActions';
import PriceTypeInput from '../../inputs/PriceTypeInput';
import type { TpcPriceModifier } from '../../types';
import type { BodyRow } from '@eventespresso/ui-components';

type Props = {
	index: number;
	isDisabled?: boolean;
	price: TpcPriceModifier;
};

type BodyRowGenerator = (props: Props) => BodyRow;

const useBodyRowGenerator = (): BodyRowGenerator => {
	return useCallback<BodyRowGenerator>(({ index, isDisabled, price }: Props) => {
		if (!price) {
			return {
				cells: [],
				rowClassName: `ee-entity-list-item--error`,
				id: '',
				key: '',
				type: 'row',
			};
		}
		const cells = [
			{
				key: 'id',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-id ee-number-column',
				value: <PriceIdInput price={price} />,
			},
			{
				key: 'order',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-order ee-number-column',
				value: <PriceOrderInput price={price} />,
			},
			{
				key: 'type',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-type',
				value: <PriceTypeInput price={price} />,
			},
			{
				key: 'name',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-name',
				value: <PriceNameInput price={price} />,
			},
			{
				key: 'description',
				type: 'cell',
				className: 'ee-ticket-price-calculator__price-desc',
				value: <PriceDescriptionInput price={price} />,
			},
			{
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator__amount ee-number-column',
				value: <PriceAmountInput price={price} />,
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: !isDisabled && <PriceModifierActions index={index} price={price} />,
			},
		];

		return {
			cells,
			rowClassName: `ee-editor-date-list-view-row ee-entity-list-item`,
			id: `ee-editor-date-list-view-row-${price.id}`,
			key: `row-${price.id}`,
			type: 'row',
		};
	}, []);
};

export default useBodyRowGenerator;
