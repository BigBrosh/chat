import mongoose from 'mongoose';

import '../databaseComponents/userModel';
import '../databaseComponents/chatsModel';
import config from '../../configs/config.json';

const User = mongoose.model('users');
const Chat = mongoose.model('chats');

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