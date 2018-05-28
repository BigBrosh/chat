import React from 'react';

import {connect} from 'react-redux';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class mainPage extends React.Component {
	// componentWillMount = () => {
	// 	if (this.props.logged === false)
	// 	{
	// 		history.replace('/registration');
	// 		history.go();
	// 	}
	// }

	render = () => {
		console.log(this.props.logged);
		
		return (
			<h1>Chat will be there</h1>
		);
	}
}

function mapStateToProps (state) {
	return {
		logged: state.loggedIn 
	}
}

export default connect(mapStateToProps)(mainPage);