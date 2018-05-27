import mongoose from 'mongoose';

import '../databaseComponents/userModel';
import config from '../../configs/config.json';

const User = mongoose.model('users');

export function setUpConnection() {
	mongoose.Promise = global.Promise;
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers() {
	return User.find();
}

export function createUser(data) {
	let user = new User({
		name: data.name,
		password: data.password
	});

	let condition = true;

	listUsers().then(data => {
		data.forEach(el => {
			if (el.name === user.name)
				condition = false;
		});

		if (condition)
			return user.save();

		else return User.remove(user);
	});
}

export function deleteUser(id) {
	return User.findById(id).remove();
}

export function clearDB() {
	User.collection.remove();
}