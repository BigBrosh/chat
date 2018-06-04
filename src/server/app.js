import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../configs/config.json';
import actions from '../actions/actions';

import * as db from './utils/dataBaseUtils';

const app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

db.setUpConnection();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


app.get('/users', (req, res) => {
	db.listUsers()
	.then(data => res.json(data));
});

app.get('/chats', (req, res) => {
	db.listChats()
	.then(data => res.json(data));
});

app.get('/messages', (req, res) => {
	db.showMessages()
	.then(data => res.json(data));
});

app.post('/users', (req, res) => {
	if (req.body.action === actions.REGISTER)
	{
		return db.findUser(req.body.data.name)
		.then(response => {
			if (response.length === 0)
			{
				db.createUser(req.body.data);
				res.sendStatus(200);				
			}

			else
				res.sendStatus(404);
		});		
	}

	else if (req.body.action === actions.LOGIN)
	{
		db.findUser(req.body.data.name)
		.then(response => {
			if (response.length !== 0)
			{
				if (response[0].password !== req.body.data.password)
					res.sendStatus(403);

				else
					res.sendStatus(200);
			}

			else
				res.sendStatus(404);
		});

	}

	else if (req.body.action === actions.FIND_USER_BY_ID)
	{
		db.findUserById(req.body.data)
		.then(data => res.json(data));
	}

	else if (req.body.action === actions.GET_USER_ID)
	{
		db.findUser(req.body.data)
		.then(data => res.json(data));
	}
});

app.post('/chats', (req, res) => {
	if (req.body.action === actions.CREATE_CHAT)
	{
		db.findUsers(req.body.data)
		.then(response => {
			let ids = response.map(el => {
				return el.name;
			});

			db.createChat(ids);
		});		
	}

	else if (req.body.action === actions.SHOW_CHATS)
	{
		db.findUsers(req.body.data)
		.then(response => {
			db.listUsersChats(response[0].name)
			.then(response => res.json(response));
		});
	}
});

app.post('/messages', (req, res) => {
	if (req.body.action === actions.GET_MESSAGES)
	{
		db.findUser(req.body.data)
		.then(response => {
			db.listUsersChats(response[0].name)
			.then(response => {
				response = response.map((el, i) => {
					return el._id
				});

				db.showChatMessages(response)
				.then(response => res.json(response));
			});
		});		
	}
});

http.listen(serverPort, () => {
	console.log(`Server is running on port ${serverPort}`);
});

// socket logic
io.on('connection', function (socket) {
	console.log('user connected!');	

	socket.on(actions.SEND_MESSAGE, function(data) {
		db.newMessage(data);
		io.emit(actions.RECEIVE_MESSAGE, data);
	});

	socket.on(actions.CREATE_CHAT, function() {
		io.emit(actions.UPDATE_CHATS);
	});	
});
