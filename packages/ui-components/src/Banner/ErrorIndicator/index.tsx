import { Banner } from '../';
import type { BannerProps } from '../types';

export const ErrorIndicator: React.FC<BannerProps> = ({ message, title }) => (
	<Banner className='ee-error-indicator' message={message} status='error' title={title} variant='subtle' />
);
