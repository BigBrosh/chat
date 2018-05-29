import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/main.sass';
import '../styles/register_page/register.sass';

import RequestController from '../controllers/RequestController';

import { apiPrefix, db } from '../configs/config.json';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class RegisterPage extends React.Component {
	state = {
		successMessage: 'You\'ve been registered. Congratulations!',
		successChecker: false,
		errorMessage: 'Something went wrong',
		errorChecker: false
	}

	componentWillMount = () => {
		this.loginChecker();
	}

	componentWillUpdate = () => {
		this.loginChecker();
	}

	loginChecker = () => {
		if (RequestController.getFromLocal('logged') === true)
		{
			history.replace('/');
			history.go();
		}	
	}

	addUser = () => {
		let nickname = document.getElementById('nickname').value;
		let password = document.getElementById('password').value;

		// if nickname is empty
		if (nickname.length === 0 || nickname.replace(/\s/ig, '').length === 0)
		{
			this.setState({
				errorChecker: true,
				errorMessage: 'You should enter some nickname'
			});
		}

		// if nickname is empty
		else if (password.length === 0 || password.replace(/\s/ig, '').length === 0)
		{
			this.setState({
				errorChecker: true,
				errorMessage: 'You should enter some password'
			});
		}

		// if input data is fine
		else
		{
			fetch( `${apiPrefix}/${db.name}`, {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: 'register',
					data: {
						name: nickname,
						password: password
						
					}
				})
			})
			.then(response => {
				if (response.status === 404)
				{
					this.setState({
						errorChecker: true,
						errorMessage: 'User already exist. Try another login'
					});
				}

				else
				{
					RequestController.sendToLocal({logged: true, login: nickname});

					this.setState({
						successChecker: true,
						errorChecker: false
					});
				}
			});
		}

	}

	render = () => {
		let message;

		if (this.state.successChecker === true)
		{
			message = <p className="message success_message">{this.state.successMessage}</p>
		}

		else if (this.state.errorChecker === true)
		{
			message = <p className="message error_message">{this.state.errorMessage}</p>
		}

		return (
			<div>
				<h2 className="title">Registration</h2>

				<div className="register_form">
					<div className="inner">
						<div className="data">
							<input id="nickname" type="text" placeholder="Nickname" />
							<input id="password" type="password" placeholder="Password" />
						</div>

						<button onClick={this.addUser} >Register</button>

						{message}

						<Link to="/login">Do you have an account?</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterPage;