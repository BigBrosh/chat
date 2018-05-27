import mongoose from 'mongoose';

import '../databaseComponents/userModel';
import config from '../../configs/config.json';

const User = mongoose.model('users');

export function setUpConnection() {
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers() {
	return User.find();
}

export function createUser(data) {
	const user = new User({
		name: data.name
	});

	return user.save();
}

export function deleteUser(id) {
	return User.findById(id).remove();
}

export function clearDB() {
	User.collection.remove();
}