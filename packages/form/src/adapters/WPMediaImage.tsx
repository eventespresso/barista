import { useCallback, useEffect } from 'react';

import { __ } from '@eventespresso/i18n';
import { Image } from '@eventespresso/adapters';
import { CloseOutlined } from '@eventespresso/icons';
import { Button, IconButton } from '@eventespresso/ui-components';
import type {} from '@eventespresso/types'; // imports global window type 'wp'

import type { FieldRendererProps } from '../types';
import Text from './Text';

const wpMedia = window?.wp?.media?.({
	title: __('Select Image'),
	button: {
		text: __('Select'),
	},
	multiple: false,
	library: {
		type: ['image'],
	},
});

const openMediaModal = () => wpMedia?.open?.();

const addonAfterProps = { px: 0, border: '0px' };

const WPMediaImage: React.FC<FieldRendererProps> = ({ displayAsInput, input, ...props }) => {
	const clearImage = useCallback(() => input.onChange(''), [input]);

	const mediaHandler = useCallback(() => {
		const attachment = wpMedia?.state()?.get('selection')?.first()?.toJSON();

		input.onChange(attachment.url);
	}, [input]);

	useEffect(() => {
		// de-register the previous listener.
		wpMedia?.off('select', mediaHandler);

		wpMedia?.on('select', mediaHandler);

		return () => wpMedia?.off('select', mediaHandler);
	}, [mediaHandler]);

	const button = <Button buttonText={__('Select')} onClick={openMediaModal} />;

	return displayAsInput ? (
		<Text {...props} input={input} addonAfter={button} addonAfterProps={addonAfterProps} />
	) : input.value ? (
		<>
			<Image boxSize='80px' src={input.value} alt='' />
			<IconButton icon={CloseOutlined} onClick={clearImage} />
		</>
	) : (
		button
	);
};

export default WPMediaImage;
