import React from 'react';

const App = () => {
	document.addEventListener('DOMContentLoaded', function () {
		const rootElement = document.getElementById('espresso-calendar');
		rootElement.innerText = 'Hello';
		// setInterval(() => {
		// 	console.log('Im running');
		// }, 1000);
	});
	React.useEffect(() => {
		setInterval(() => {
			console.log('Application is running');
		}, 3000);
	}, []);

	return (
		<React.Fragment>
			<div>Hello World kkkkkk</div>
		</React.Fragment>
	);
};

export default App;
