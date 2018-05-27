import React from 'react';

import '../styles/main.sass';
import '../styles/register_page/register.sass';

export class RegisterPage extends React.Component {
	render = () => {
		return (
			<div>
				<h2 className="title">Registration</h2>

				<div className="register_form">
					<div className="inner">
						<div className="data">
							<input type="text" placeholder="Nickname" />
							<input type="password" placeholder="Password" />
						</div>

						<button>Register</button>
					</div>
				</div>
			</div>
		)
	}
}