import { Heading, TextLink } from '../../';
import type { UpsellProps } from '../types';

import '../style.scss';

export const CompactTemplate: React.FC<UpsellProps> = ({ className, cTA, cTALink, dismissBtn, mainTitle }) => {
	const prefixClassName = 'ee-upsell--template-compact';

	return (
		<div className={className}>
			<Heading as='h3' className={`${prefixClassName}__main-title`}>
				{mainTitle}
			</Heading>
			<div className={`${prefixClassName}__cta`}>
				{cTA && (
					<TextLink href={cTALink} size='small'>
						{cTA}
					</TextLink>
				)}
			</div>
			{dismissBtn}
		</div>
	);
};
