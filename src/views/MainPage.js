import React from 'react';

import RequestController from '../controllers/RequestController';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class mainPage extends React.Component {
	componentWillMount = () => {
		let logged = RequestController.getFromLocal('logged');
		if (logged === false ||
			!logged)
		{
			history.replace('/login');
			history.go();
		}
	}

	render = () => {		
		return (
			<h1>Chat will be there</h1>
		);
	}
}

export default mainPage;