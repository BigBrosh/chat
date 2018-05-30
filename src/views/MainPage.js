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
			<div class="main_chat_wrap">
				<div class="aside">
					<div class="top_line">
						<button>Create chat</button>
					</div>

					<ul class="available_chats">
						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Very big last message from somebody</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>

						<li class="chat">
							<p class="chat_title">Nickname</p>
							<p class="chat_preview">Last message</p>
						</li>
					</ul>
				</div>

				<div class="chat_wrap"></div>
			</div>
		);
	}
}

export default mainPage;