import mongoose from 'mongoose';

import '../databaseComponents/userModel';
import '../databaseComponents/chatsModel';
import '../databaseComponents/messagesModel';
import '../databaseComponents/MessagesUpdatesModel';

import config from '../../configs/config.json';

const User = mongoose.model('users');
const Chat = mongoose.model('chats');
const Messages = mongoose.model('messages');
const MessagesUpdates = mongoose.model('messagesUpdates');

// user model's methods
export function setUpConnection() {
	mongoose.Promise = global.Promise;
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers() {
	return User.find();
}

export function findUser(name) {
	return User.find({ name: name });
}

export function findUserById(id) {
	return User.find({ _id: id });
}

export function findUsers(names) {
	return User.find({ name: {$in: names} });
}

export function createUser(data) {
	let user = new User({
		name: data.name,
		password: data.password
	});

	user.save();
}

export function deleteUser(id) {
	return User.findById(id).remove();
}

export function clearUserDB() {
	User.collection.remove();
}


// chat model's methods
export function listChats() {
	return Chat.find();
}

export function listUsersChats(id) {
	return Chat.find({ availableUsersIds: id });
}

export function createChat(data) {
	let chat = new Chat({
		id: data.chatId,
		availableUsers: data.names,
		availableUsersIds: data.ids
	});

	chat.save();
}

export function clearChatsDB() {
	Chat.collection.remove();
}


// messages model's methods
export function showMessages() {
	return Messages.find();
}

export function newMessage(data) {
	let newMessage = new Messages({
		chatId: data.chatId,
		senderId: data.senderId,
		senderNickName: data.senderNickName,
		message: data.message,
		date: data.date
	});

	MessagesUpdates.update(
		{ 
			"chatId": data.chatId,
			"isOnline": false
		},
		{ $inc: { "newMessages" : 1 } },
		{
			multi: true
		},
		function (err) {
			if (err) return handleError(err);
		}
	);

	newMessage.save();
}

export function showChatMessages(ids) {
	return Messages.find({ chatId: { $in: ids } });
}

export function clearMessagesDB() {
	Messages.collection.remove();
}


// messages updates model's methods
export function showMessagesUpdates() {
	return MessagesUpdates.find();
}

export function createMessagesUpdates(users, id) {
	users.forEach(el => {
		let newMessageUpdates = new MessagesUpdates ({
			chatId: id,
			userId: el,
			lastSeen: new Date(),
			isOnline: false,
			newMessages: 0
		});

		newMessageUpdates.save();
	});
}

export function showUserMessagesUpdates(data) {
	return MessagesUpdates.find({
		chatId: data.chatId,
		userId: data.userId
	});
}

export function clearMessagesUpdatesDB() {
	MessagesUpdates.collection.remove();
}