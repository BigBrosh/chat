import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {type: String},
	password: {type: String}
});

const User = mongoose.model('users', UserSchema);