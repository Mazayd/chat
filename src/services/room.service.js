const { BaseService } = require('./base.service');

class RoomService extends BaseService {
	async createRoom(password, token) {
		try {
			const decode = await this.auth(token);
			const encryptionPassword = await this.generatePasswordHash(password);
			const [room_key, room_iv] = this.generateRandomKeyAndIv();
			const [encryption_room_key, encryption_room_iv] = this.encryptionRoomKeyAndIv(room_key, room_iv);
			const newRoom = await this.roomModel.createRoom({
				owner_id: decode.id,
				password: encryptionPassword,
				room_key: encryption_room_key,
				room_iv: encryption_room_iv,
			});
			await this.roomModel.addUserToRoom(newRoom[0].id, decode.id);
			return { success: true, message: 'Room created', room_id: newRoom[0].id };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}

	async joinRoom(room_id, password, token, ws, wss) {
		try {
			const decode = await this.auth(token);
			ws.id = decode.id;
			const room = await this.roomModel.getRoomById(room_id);
			if (!room.length) {
				return { success: false, message: 'The room with such an ID does not exist.' };
			}
			if (!(await this.comparePassword(password, room[0].password))) {
				return { success: false, message: 'Incorrect password' };
			}
			const user = await this.userModel.getUserById(decode.id);
			const pub_key = user[0].pub_key;
			const [decryption_room_key, decryption_room_iv] = this.decryptionRoomKeyAndIv(room[0].room_key, room[0].room_iv);
			const [encryption_room_key, encryption_room_iv] = this.encryptionRoomKeyAndIvByUserPubKey(
				decryption_room_key,
				decryption_room_iv,
				pub_key
			);
			const usersRoom = await this.roomModel.getUsersRoom(room_id);
			if (usersRoom.some((obj) => obj.user_id === decode.id)) {
				ws.room = room[0].id;
				return {
					success: true,
					message: 'Your room.',
					room: {
						id: room[0].id,
						owner_id: room[0].owner_id,
						users_room: usersRoom,
						room_key: encryption_room_key,
						room_iv: encryption_room_iv,
					},
				};
			}
			await this.roomModel.addUserToRoom(room_id, decode.id);
			const newUsersRoom = await this.roomModel.getUsersRoom(room_id);
			ws.room = room[0].id;
			this.emitUpdateRoomMessage(
				wss,
				room_id,
				newUsersRoom,
				decode,
				[{ id: decode.id, username: decode.username }],
				'newUserInRoom'
			);
			return {
				success: true,
				message: 'Your room.',
				room: {
					id: room[0].id,
					owner_id: room[0].owner_id,
					users_room: newUsersRoom,
					room_key: encryption_room_key,
					room_iv: encryption_room_iv,
				},
			};
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}

	async deleteRoom(room_id, token, ws) {
		try {
			const decode = await this.auth(token);
			ws.id = decode.id;
			const room = await this.roomModel.getRoomById(room_id);
			if (!room.length) {
				return { success: false, message: 'The room with such an ID does not exist.' };
			}
			if (room[0].owner_id !== decode.id) {
				return { success: false, message: 'The room can only be deleted by the owner.' };
			}
			await this.roomModel.deleteUsersRoom(room_id);
			await this.messageModel.deletedMessagesByRoomId(room_id);
			const deletedRoomId = await this.roomModel.deleteRoom(room_id);
			return { success: true, message: 'Room deleted', deletedRoomId };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}
}

module.exports = {
	RoomService,
};
