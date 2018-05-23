import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import {MainPage} from './views/MainPage';
import {ErrorPage} from './views/ErrorPage';

const history = createBrowserHistory();

class Main extends React.Component {
	componentWillReceiveProps = nextProps =>{
		if (nextProps)
			return this.props.history !== nextProps.history;
	};

	render = () => {
		return(
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={MainPage} />
					<Route path="/404" component={ErrorPage} />
					<Redirect to='/404' />
				</Switch>
			</Router>
		)
	}
};

ReactDOM.render(
	<Main history={history}/>,
	document.getElementById("root")
);

