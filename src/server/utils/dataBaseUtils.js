import mongoose from 'mongoose';

import '../databaseComponents/userModel';
import '../databaseComponents/chatsModel';
import '../databaseComponents/messagesModel';
import config from '../../configs/config.json';

const User = mongoose.model('users');
const Chat = mongoose.model('chats');
const Messages = mongoose.model('messages');

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

export function listUsersChats(name) {
	return Chat.find({ availableUsers: name });
}

export function createChat(ids) {
	let chat = new Chat({
		availableUsers: ids
	});

	return chat.save();
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

	newMessage.save();
}

export function showChatMessages(ids) {
	return Messages.find({ chatId: { $in: ids } });
}

export function clearMessagesDB() {
	Messages.collection.remove();
}