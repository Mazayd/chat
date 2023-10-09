const { RoomModel } = require('../models/room.model');
const { MessageModel } = require('../models/message.model');
const { emitUpdateRoomMessage } = require('../event/emitUpdateRoomMessage');
const { auth } = require('../lib/auth/auth');

class MessageService {
	constructor() {
		this.roomModel = new RoomModel();
		this.messageModel = new MessageModel();
		this.emitUpdateRoomMessage = emitUpdateRoomMessage;
		this.auth = auth;
	}

	async sendMessage(room_id, data, token, wss) {
		try {
			const decode = await this.auth(token);
			const room = await this.roomModel.getRoomById(room_id);
			if (!room.length) {
				return { success: false, message: 'The room with such an ID does not exist.' };
			}

			const usersRoom = await this.roomModel.getUsersRoom(room_id);
			const isUserInRoom = usersRoom.some((obj) => obj.user_id === decode.id);
			if (!isUserInRoom) {
				return { success: false, message: 'You cannot send a message to a room you are not a member of.' };
			}

			const newMessage = await this.messageModel.createMessage({ owner_id: decode.id, data, room_id });
			this.emitUpdateRoomMessage({ wss, room_id, usersRoom, decode, message: newMessage, action: 'sendMessage' });
			return { success: true, message: 'The message has been sent.' };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}

	async getMessages(pageSize, token, room_id, offset) {
		try {
			const decode = await this.auth(token);
			const usersRoom = await this.roomModel.getUsersRoom(room_id);
			const isUserInRoom = usersRoom.some((obj) => obj.user_id === decode.id);
			if (!isUserInRoom) {
				return { success: false, message: 'You are not a member of this room.' };
			}

			const messages = await this.messageModel.getMessagesByRoom(room_id, pageSize, offset);
			return { success: true, messages };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}

	async deleteMessage(message_id, token, wss) {
		try {
			const decode = await this.auth(token);
			const message = await this.messageModel.getMessageById(message_id);
			if (!message.length) {
				return { success: false, message: 'Message not found' };
			}

			const room = await this.roomModel.getRoomById(message[0].room_id);
			const usersRoom = await this.roomModel.getUsersRoom(room[0].id);
			if (!room.length) {
				return { success: false, message: 'Room not found' };
			}
			if (decode.id !== message[0].owner_id && room[0].owner_id !== decode.id) {
				return { success: false, message: 'You cannot delete this message.' };
			}

			const deletedMessage = await this.messageModel.deleteMessageById(message_id);
			this.emitUpdateRoomMessage({
				wss,
				room_id: room[0].id,
				usersRoom,
				decode,
				message: deletedMessage,
				action: 'deleteMessageInRoom',
			});
			return { success: true, message: 'Message deleted' };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}

	async updateMessage(message_id, token, data, wss) {
		try {
			const decode = await this.auth(token);
			const message = await this.messageModel.getMessageById(message_id);
			if (!message.length) {
				return { success: false, message: 'Message not found' };
			}
			const room = await this.roomModel.getRoomById(message[0].room_id);
			const usersRoom = await this.roomModel.getUsersRoom(room[0].id);
			if (!message.length) {
				return { success: false, message: 'Room not found' };
			}
			if (message[0].owner_id !== decode.id) {
				return { success: false, message: 'You cannot modify the message.' };
			}
			const updateMessage = await this.messageModel.updateMessageById(message_id, { data });
			this.emitUpdateRoomMessage({
				wss,
				room_id: room[0].id,
				usersRoom,
				decode,
				message: updateMessage,
				action: 'updateMessageInRoom',
			});
			return { success: true, message: 'Message updated' };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}
}

module.exports = {
	MessageService,
};
