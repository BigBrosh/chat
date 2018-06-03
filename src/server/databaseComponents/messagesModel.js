import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
	chatId: { type: String },
	senderId: { type: String },
	senderNickName: { type: String },
	message: { type: String },
	date: { type: Date }
});

const Messages = mongoose.model('messages', MessagesSchema);