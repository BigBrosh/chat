import React from 'react';

import '../styles/main.sass';
import '../styles/register_page/register.sass';

import { apiPrefix, db } from '../configs/config.json';

export class RegisterPage extends React.Component {
	addUser = () => {
		let nickname = document.getElementById('nickname').value;
		let password = document.getElementById('password').value;

		fetch( `${apiPrefix}/${db.name}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: nickname,
				password: password
			})
		})
		.then(console.log('done'))
		.catch(error => {
			throw error
		});
	}

	render = () => {
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
					</div>
				</div>
			</div>
		)
	}
}