//var react = require('react');
//console.log(react.version);
import React from 'react';
import ReactDOM from 'react-dom';
//import { AppContainer } from 'react-hot-loader';

import Root from './root';

ReactDOM.render(
	<Root />,
	document.getElementById('root')
);

/*
if (module.hot) {
	module.hot.accept('./root', () => {
		const NewRoot = require('./root').default;
		ReactDOM.render(
			<AppContainer>
				<NewRoot />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
 */