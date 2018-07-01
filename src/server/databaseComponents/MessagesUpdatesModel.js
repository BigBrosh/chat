import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessagesUpdatesSchema = new Schema ({
	chatId: { type: String },
	userId: { type: String },
	lastSeen: { type: Date },
	isOnline: { type: Boolean },
	newMessages: { type: Number }
});

const MessagesUpdates = mongoose.model('messagesUpdates', MessagesUpdatesSchema);