import React, { Suspense } from 'react';

import { LoadingNotice } from '@eventespresso/components';

const CardView = React.lazy(() => import(/* webpackChunkName: "dates-card-view" */ './CardView'));

const RenderCardView: React.FC = () => {
	return (
		<Suspense fallback={<LoadingNotice />}>
			<CardView />
		</Suspense>
	);
};

export default RenderCardView;
