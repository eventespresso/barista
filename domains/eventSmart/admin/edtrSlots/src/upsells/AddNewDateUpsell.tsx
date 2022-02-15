import { NewEntityOption, TextLink } from '@eventespresso/ui-components';
import { EdtrSlots } from '@eventespresso/services';
import { NewDateOption } from '@eventespresso/edtr-services';
import { UpCircleFilled } from '@eventespresso/icons';

import { useUpsellAd4Slot, useShouldDisplayUpsellAd } from '../hooks';

export type NewDateUpsellProps = {
	slot: EdtrSlots;
	output?: React.ReactNode;
};

export const AddNewDateUpsell: React.FC<NewDateUpsellProps> = ({ output, slot }) => {
	const upsellAd4Slot = useUpsellAd4Slot()(slot);
	const shouldDisplayUpsellAd = useShouldDisplayUpsellAd();

	if (!upsellAd4Slot || !shouldDisplayUpsellAd(upsellAd4Slot)) {
		return <>{output}</>;
	}
	// extract upsell data
	const { mainTitle, subTitle, cTA, cTALink } = upsellAd4Slot;

	return (
		<NewDateOption>
			{({ count }) => {
				const isOnlyButton = count === 1;

				const link = <TextLink href={cTALink}>{cTA}</TextLink>;

				if (isOnlyButton) {
					return link;
				}
				return (
					<NewEntityOption description={subTitle} icon={UpCircleFilled} title={mainTitle}>
						{link}
					</NewEntityOption>
				);
			}}
		</NewDateOption>
	);
};
