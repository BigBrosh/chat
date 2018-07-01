import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	id: { type: String },
	availableUsers: { type: Array },
	availableUsersIds: { type: Array }
});

const Chat = mongoose.model('chats', ChatSchema);