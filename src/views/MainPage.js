import React from 'react';

import '../styles/chat_page/chat.sass';

import logoutIco from '../img/log-out-symbol.svg';

import config from '../configs/config.json';

import io from 'socket.io-client/dist/socket.io';

import RequestController from '../controllers/RequestController';
import actions from '../actions/actions';
import { apiPrefix, db, chat_db, messages_db, messagesUpdates_db } from '../configs/config.json';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class mainPage extends React.Component {
	state = {
		login: RequestController.getFromLocal('login'),
		userId: '',
		socket: null,
		messages: '',
		availableUsers: '',
		availableChats: [],
		usersToCreateChat: [RequestController.getFromLocal('login')],
		displayCreateModal: false,
		successCreatedChat: false,
		activeChat: '',
		messagesUpdates: {}
	}

	componentWillMount = () => {
		this.checkUser();

		// get user id
		fetch( `${apiPrefix}/${db.name}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.GET_USER_ID,
				data: this.state.login
			})
		})
		.then(data => {
			data.json()
			.then(response => {
				this.setState({
					userId: response[0]._id
				})
			});
		});

		this.updateChats();

		// user messages
		let messages = {};

		fetch( `${apiPrefix}/${messages_db}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.GET_MESSAGES,
				data: this.state.login
			})
		})
		.then(data => {
			data.json()
			.then(response => {
				response.forEach((el, i) => {
					if (!messages[el.chatId])
						messages[el.chatId] = [];

					messages[el.chatId].push(el);					
				});

				this.setState({
					messages: messages
				});
			});
		});
	}

	componentDidMount = () => {
		// scrolling to the bottom of the chat history
		let messageWrap = document.querySelector('.messageWrap');
		messageWrap.scroll(0, messageWrap.scrollHeight );

		this.initSocket();
		this.updateMessagesUpdates();
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.messages === '' && this.state.messages !== '')
			this.updateMessagesUpdates();
	}

	initSocket = () => {
		let socket = io(`http://${config.db.host}:${config.serverPort}`),
			self = this;

		socket.on(actions.RECEIVE_MESSAGE, function(msg) {
			let newMessages = self.state.messages;

			newMessages[msg.chatId] ? newMessages[msg.chatId].push(msg) : newMessages[msg.chatId] = [msg];

			self.setState({
				messages: newMessages
			});

			self.updateMessagesUpdates();
		});

		socket.on(actions.UPDATE_CHATS, function(msg) {
			self.updateChats();
		});

		this.setState({
			socket: socket
		});
	}

	updateChats = () => {
		fetch( `${apiPrefix}/${chat_db}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.SHOW_CHATS,
				data: this.state.login
			})
		})
		.then(data => {
			data.json()
			.then(response => {
				this.setState({
					availableChats: response
				})
			});
		});		
	}

	// check user
	checkUser = () => {
		let logged = RequestController.getFromLocal('logged');

		if (logged === false ||
			!logged ||
			logged === null)
		{
			history.replace('/login');
			history.go();
		}	
	}

	sendMessage = () => {
		let input = document.getElementById('message_input'),
			message = input.value;

		this.state.socket.emit(actions.SEND_MESSAGE, {
			chatId: this.state.availableChats[this.state.activeChat].id,
			senderId: this.state.userId,
			senderNickName: this.state.login,
			message: message,
			date: new Date()
		});

		input.value = '';
	}


	// chat creating
	createChat = () => {
		fetch( `${apiPrefix}/${chat_db}`, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: actions.CREATE_CHAT,
				data: {
					id: `${+new Date()}${this.state.userId}`,
					users: this.state.usersToCreateChat
				}
			})
		});

		this.setState({
			successCreatedChat: true
		});

		this.state.socket.emit(actions.CREATE_CHAT);
	}

	// modal logic
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

	closeModal = () => {
		this.setState({
			successCreatedChat: false,
			displayCreateModal: false,
			usersToCreateChat: [RequestController.getFromLocal('login')]
		});
	}

	goToChat = index => {
		this.setState({
			activeChat: index
		});
	}

	logOut = () => {
		RequestController.sendToLocal({ 'login': null, 'logged': null });
		this.checkUser();
	}

	checkDate = date => date > 9 ? date : '0' + date;

	updateMessagesUpdates = () => {
		this.state.availableChats.forEach((el, i) => {
			fetch( `${apiPrefix}/${messagesUpdates_db}`, {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: actions.GET_MESSAGES_UPDATES,
					data: {
						chatId: el.id,
						userId: this.state.userId
					}
				})
			})

			.then(data => {
				data.json()
				.then(response => {
					let newChatsData = this.state.messagesUpdates;

					newChatsData[i] = response[0]["newMessages"];

					this.setState({
						messagesUpdates: newChatsData
					})
				});
			});
		});
	}

	render = () => {
		let currentUser = RequestController.getFromLocal('login'),
			availableUsers,
			usersToCreateChat,
			availableChats,
			messages = '';

		// available users for chat creating
		if (this.state.availableUsers !== '')
		{
			availableUsers = this.state.availableUsers.map((el, i) => {
				if (el.name !== currentUser)
					return <li key={i} onClick={this.addToUserList}>{ el.name }</li>
			});

			// chosen users
			if (this.state.usersToCreateChat.length > 1)
			{
				usersToCreateChat = this.state.usersToCreateChat.map((el, i) => {
					if (i !== 0)
						return <li key={i} onClick={this.removeFromUserList}>{el}</li>
				});
			}
		}

		// displaying chats which are available for current user
		if (this.state.availableChats.length !== 0)
		{
			availableChats = this.state.availableChats.map((chat, i) => {				
				let users = chat.availableUsers.filter(el => el !== this.state.login).join(', '),
					message = this.state.messages[chat.id]
					? this.state.messages[chat.id][this.state.messages[chat.id].length - 1].message
					: 'no messages yet',
					messageStyle = message === 'no messages yet' ? { opacity: '.6' } : {};

				if (this.state.messages[chat.id] && this.state.messages[chat.id][this.state.messages[chat.id].length - 1].senderId === this.state.userId)
					message = `You: ${message}`;

				return (
				<li className="chat" key={i} onClick={() => this.goToChat(i)}>
					<p className="chat_title">{ users }<span className='messages_updates'>{this.state.messagesUpdates[i] || ''}</span></p>
					<p className="chat_preview" style={ messageStyle }>{ message }</p>
				</li>
				)			
			});

			availableChats = availableChats.reverse();
		}

		// outputing messages in chats
		if (this.state.activeChat !== '' && this.state.messages[this.state.availableChats[this.state.activeChat].id])
		{
			messages = this.state.messages[this.state.availableChats[this.state.activeChat].id].map((el, i) => {
				let date = new Date(el.date),
					year = date.getFullYear(),
					month = this.checkDate(date.getMonth() + 1),
					day = this.checkDate(date.getDate()),
					hours = this.checkDate(date.getHours()),
					minutes = this.checkDate(date.getMinutes());

				return 	(
				<li className={el.senderNickName === this.state.login ? 'message_item fromLogged' : 'message_item'} key={i} >
					<p className="sender">{ el.senderNickName }</p>
					<p className="message">{ el.message }</p>
					<p className="date">{ `${year}-${month}-${day}\n${hours}:${minutes}`}</p>
				</li>
				)
			});

			messages = messages.reverse();
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

						{ 	this.state.usersToCreateChat.length > 1	?

							<div>
								<p>Choosed users (remove by click):</p>

								<ul className="users_list users_to_create_chat">
									{ usersToCreateChat }
								</ul>

								{ this.state.successCreatedChat === false ? '' : <p className="success_message">Chat created!</p> }

								<button className="create_button" onClick={this.createChat}>Create</button>
							</div>

							: '' }
					</div>
				</div>

				<div className="aside">
					<div className="top_line">
						<button onClick={this.openModal}>Create chat</button>
						<button className="logout" onClick={this.logOut}>
							<img src={logoutIco} alt="logout" />
						</button>
					</div>

					<ul className="available_chats">
						{ availableChats }					
					</ul>
				</div>

				<div className="chat_wrap">
					<div className="top_line">
						<p className="chat_active_title">
							{ 
								this.state.activeChat === '' ?
								'Choose or create chat' :
								this.state.availableChats[this.state.activeChat].availableUsers.filter(el => el !== this.state.login).join(', ')
							}
						</p>
					</div>

					<ul className="messageWrap">
						{/* 
							message template

							<li className="message_item">
								<p className="sender">Some nickname</p>
								<p className="message">Hello, this is some very sensful message. Lorem ipsum could be here, but not today :)</p>
							</li> 
						*/}

						{ messages }
					</ul>

					<div className="message_input_wrap" style={{ pointerEvents: this.state.activeChat === '' ? 'none' : 'auto' }}>
						<textarea id="message_input" />
						<button id="send_message" onClick={this.sendMessage}></button>
					</div>
				</div>
			</div>
		);
	}
}

export default mainPage;