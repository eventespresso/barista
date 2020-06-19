import React from 'react';
import ReactLogo from './ReactLogo.svg';
import './App.css';

import { Check, TableView, Trash } from '@eventespresso/icons';

const App: React.FC = () => {
	return (
		<div className='App'>
			<header className='App-header'>
				<div>
					<img src={ReactLogo} className='React-logo' alt='React Logo' />
				</div>
				<h1>
					<a
						className='App-link'
						href='https://github.com/react-workspaces/cra-workspaces-playground'
						target='_blank'
						rel='noopener noreferrer'
					>
						<strong>React</strong> Workspaces <sup>(TypeScript)</sup>
					</a>
				</h1>
				<h2>Hot Reload Your React TypeScript Workspaces.</h2>
				<p className='body'>
					<code className='file'>packages/apps/app-typescript/src/App.tsx</code>
					<code className='file'>packages/components/src/CompOne/CompOne.tsx</code>
					<code className='file'>packages/components/src/CompTwo/CompTwo.tsx</code>
				</p>
				<div className='components'>
					<Check />
					<TableView />
					<Trash />
				</div>
			</header>
		</div>
	);
};

export default App;
