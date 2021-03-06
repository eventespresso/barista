import { lazy, Suspense } from 'react';

import { LoadingNotice } from '@eventespresso/ui-components';

const CardView = lazy(() => import(/* webpackChunkName: "tickets-card-view" */ './CardView'));

const RenderCardView: React.FC = () => {
	return (
		<Suspense fallback={<LoadingNotice />}>
			<CardView />
		</Suspense>
	);
};

export default RenderCardView;
