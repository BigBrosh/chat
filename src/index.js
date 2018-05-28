import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './reducer/reducer.js';

import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import MainPage from './views/MainPage';
import RegisterPage from './views/RegisterPage';
import {ErrorPage} from './views/ErrorPage';


const history = createBrowserHistory();

class Main extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps)
			return this.props.history !== nextProps.history;
	}

	render() {
		return (
			<Provider store={store}>			
				<Router history={this.props.history}>
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/registration" component={RegisterPage} />
						<Route path="/404" component={ErrorPage} />
					</Switch>
				</Router>
			</Provider>
		)
	}
};

ReactDOM.render(
	<Main history={history}/>,
	document.getElementById("root")
);