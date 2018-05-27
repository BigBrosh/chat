import React from 'react';

export class MainPage extends React.Component {
	state = {
		list: ''
	}

	componentWillMount = () => {
		this.getList();
	}

	getList = () => {
		fetch('http://localhost:8080/users', {
			method: 'GET'
		})
		.then(data => {
			data.json()
			.then(response => {
				this.setState({
					list: response
				})
			})
		});
	}

	render = () => {
		if (this.state.list === '')
			return false;

		else 
		{
			let list = this.state.list.map((el, i) => <p key={i}>{el.name}</p>);

			return (
				<div>
					<h1 style={{textAlign: 'center'}}>Chat will be soon</h1>
					{list}
				</div>
			)			
		}
	}
}