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


	User.find({ name: user.name}, function (err, docs) {
		if (!(docs.length > 0))
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