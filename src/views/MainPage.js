import React from 'react';

import '../styles/chat_page/chat.sass';

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
			<div className="main_chat_wrap">
				<div className="aside">
					<div className="top_line">
						<button>Create chat</button>
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
							<p className="message">Well, it's fine</p>
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
					</ul>
				</div>
			</div>
		);
	}
}

export default mainPage;