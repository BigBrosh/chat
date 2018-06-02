import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	availableUsers: { type: Array }
});

const Chat = mongoose.model('chats', ChatSchema);