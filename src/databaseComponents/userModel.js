import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id: {type: Number},
	name: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);