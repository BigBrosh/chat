import React from 'react';

import '../styles/chat_page/chat.sass';

import config from '../configs/config.json';

import io from 'socket.io-client/dist/socket.io';

import RequestController from '../controllers/RequestController';
import actions from '../actions/actions';
import { apiPrefix, db, chat_db } from '../configs/config.json';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class mainPage extends React.Component {
	state = {
		messages: '',
		availableUsers: '',
		usersToCreateChat: [RequestController.getFromLocal('login')],
		displayCreateModal: false,
		socket: null,
		successCreatedChat: false
	}

	componentWillMount = () => {
		let logged = RequestController.getFromLocal('logged');

		if (logged === false ||
			!logged)
		{
			history.replace('/login');
			history.go();
		}

		let login = RequestController.getFromLocal('login');

		// available chats
		fetch( `${apiPrefix}/${chat_db}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.SHOW_CHATS,
				data: login
			})
		})
		.then(data => {
			data.json()
			.then(response => {
				console.log(response);
			});
		});
	}

	componentDidMount = () => {
		// scrolling to the bottom of the chat history
		let messageWrap = document.querySelector('.messageWrap');
		messageWrap.scroll(0, messageWrap.scrollHeight );

		this.initSocket();
	}

	initSocket = () => {
		let socket = io(`http://${config.db.host}:${config.serverPort}`),
			self = this;

		socket.on(actions.RECEIVE_MESSAGE, function(msg) {
			console.log(`mes: ${msg}`);

			self.setState({
				messages: msg
			});
		});

		this.setState({
			socket: socket
		});
	}

	sendMessage = () => {
		let message = document.getElementById('message_input').value;
		this.state.socket.emit(actions.SEND_MESSAGE, message);
	}

	addToUserList = e => {
		let user = e.target.innerHTML;

		if (this.state.usersToCreateChat.indexOf(user) === -1)
		{
			let newUsers = this.state.usersToCreateChat;
			newUsers.push(user);

			this.setState({
				usersToCreateChat: newUsers
			})
		}
	}

	removeFromUserList = e => {
		let user = e.target.innerHTML;

		let newUsers = this.state.usersToCreateChat;
		newUsers = newUsers.filter(el => el !== user);

		this.setState({
			usersToCreateChat: newUsers
		});
	}

	createChat = () => {
		fetch( `${apiPrefix}/${chat_db}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.CREATE_CHAT,
				data: this.state.usersToCreateChat
			})
		});

		this.setState({
			successCreatedChat: true
		});
	}

	openModal = () => {
		this.setState({
			displayCreateModal: true,
			successCreatedChat: false
		});

		fetch( `${apiPrefix}/${db.name}`, {
			method: 'GET',
			headers: { "Content-Type": "application/json" }
		})
		.then(data => {
			data.json()
			.then(response => {
				this.setState({
					availableUsers: response
				});
			})
		});
	}

	closeModal = () => {
		this.setState({
			successCreatedChat: false,
			displayCreateModal: false,
			usersToCreateChat: [RequestController.getFromLocal('login')]
		});
	}

	render = () => {
		let currentUser = RequestController.getFromLocal('login'),
			availableUsers,
			usersToCreateChat;

		if (this.state.availableUsers !== '')
		{
			availableUsers = this.state.availableUsers.map((el, i) => {
				if (el.name !== currentUser)
					return <li key={i} onClick={this.addToUserList}>{ el.name }</li>
			});

			if (this.state.usersToCreateChat.length > 1)
			{
				usersToCreateChat = this.state.usersToCreateChat.map((el, i) => {
					if (i !== 0)
						return <li key={i} onClick={this.removeFromUserList}>{el}</li>
				});
			}
		}

		return (
			<div className="main_chat_wrap">
				<div id="createChat" className="modal" style={{display: this.state.displayCreateModal === true ? 'block' : 'none'}} >
					<div className="inner_wrap">
						<p className="title stylized_title">Create new chat<span className="close_button" onClick={this.closeModal}></span></p>

						<p>Choose users from list:</p>

						<ul className="users_list available_users">
							{ availableUsers }
						</ul>

						{ 	
							this.state.usersToCreateChat.length > 1
							?

							<div>
								<p>Choosed users (remove by click):</p>

								<ul className="users_list users_to_create_chat">
									{ usersToCreateChat }
								</ul>

								{ this.state.successCreatedChat === false ? '' : <p className="success_message">Chat created!</p> }

								<button className="create_button" onClick={this.createChat}>Create</button>
							</div>

							:
							''
						}
					</div>
				</div>

				<div className="aside">
					<div className="top_line">
						<button onClick={this.openModal}>Create chat</button>
					</div>

					<ul className="available_chats">
						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Very big last message from somebody</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>

						<li className="chat">
							<p className="chat_title">Nickname</p>
							<p className="chat_preview">Last message</p>
						</li>
					</ul>
				</div>

				<div className="chat_wrap">
					<div className="top_line">
						<p className="chat_active_title">Nickname or group</p>
					</div>

					<ul className="messageWrap">
						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>

						<li className="message_item fromLogged">
							<p className="sender">My nickname</p>
							<p className="message">Well, it's fine</p>
						</li>

						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>

						<li className="message_item fromLogged">
							<p className="sender">My nickname</p>
							<p className="message">Well, it's fine, but we can do better</p>
						</li>

						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>

						<li className="message_item fromLogged">
							<p className="sender">My nickname</p>
							<p className="message">Well, it's fine</p>
						</li>

						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>

						<li className="message_item fromLogged">
							<p className="sender">My nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>

						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be :)</p>
						</li>

						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>
						<li className="message_item">
							<p className="sender">Some nickname</p>
							<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
						</li>
					</ul>

					<div className="message_input_wrap">
						<textarea id="message_input" />
						<button id="send_message" onClick={this.sendMessage}></button>
					</div>
				</div>
			</div>
		);
	}
}

export default mainPage;