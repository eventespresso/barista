import classNames from 'classnames';

import { Image } from '@eventespresso/adapters';
import { Button, Heading, TextLink } from '../../';
import type { UpsellProps } from '../types';

import '../style.scss';

export const BaseTemplate: React.FC<UpsellProps> = ({
	altCTAText,
	cTA,
	cTALink,
	image,
	imagePosition = 'right',
	mainText,
	mainTitle,
	subTitle,
	...props
}) => {
	const className = classNames(`ee-upsell--image-position-${imagePosition}`, props.className);
	const prefixClassName = 'ee-upsell--template-base';

	return (
		<div className={className}>
			{imagePosition !== 'bottom' && image && <Image src={image} />}
			<div>
				<Heading as='h3' className={`${prefixClassName}__main-title`}>
					{mainTitle}
				</Heading>
				<Heading as='h4' className={`${prefixClassName}__subTitle`}>
					{subTitle}
				</Heading>
				{mainText && <p className={`${prefixClassName}__main-text`}>{mainText}</p>}
				<div className={`${prefixClassName}__base__cta`}>
					{cTA && (
						<TextLink href={cTALink} size='small'>
							{cTA}
						</TextLink>
					)}
					{altCTAText && (
						<Button buttonType='default' size='small'>
							{altCTAText}
						</Button>
					)}
				</div>
			</div>
			{imagePosition === 'bottom' && image && <Image src={image} />}
		</div>
	);
};
