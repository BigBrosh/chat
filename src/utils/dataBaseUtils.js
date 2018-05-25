import mongoose from 'mongoose';
import '../databaseComponents/userModel';

const User = mongoose.model('User');

export function setUpConnection() {
	mongoose.connect(`mongodb://localhost/notes`);
}

export function listUsers() {
	return User.find();
}

export function createUser(data) {
	const user = new User({
		id: User.count() + 1,
		name: data.name
	});

	return user.save();
}

export function deleteUser(id) {
	return Note.findById(id).remove();
}