const { UserModel } = require('../models/user.model');
const { RoomModel } = require('../models/room.model');
const { MessageModel } = require('../models/message.model');
const { generateRandomKeyAndIv } = require('../lib/cryptography/keyGenerationAndIv');
const { encryptionRoomKeyAndIv } = require('../lib/cryptography/encryptionRoomKeyAndIv');
const { decryptionRoomKeyAndIv } = require('../lib/cryptography/decryptionRoomKetAndIv');
const { encryptionRoomKeyAndIvByUserPubKey } = require('../lib/cryptography/encryptionRoomKeyAndIvByUserPubKey');
const { generatePasswordHash, comparePassword } = require('../lib/cryptography/password');
const { createToken, decodedJwt } = require('../lib/auth/jwt');
const { auth } = require('../lib/auth/auth');
const { event } = require('../event/eventEmitter');
class BaseService {
	constructor() {
		this.userModel = new UserModel();
		this.roomModel = new RoomModel();
		this.messageModel = new MessageModel();
		this.generateRandomKeyAndIv = generateRandomKeyAndIv;
		this.encryptionRoomKeyAndIv = encryptionRoomKeyAndIv;
		this.decryptionRoomKeyAndIv = decryptionRoomKeyAndIv;
		this.encryptionRoomKeyAndIvByUserPubKey = encryptionRoomKeyAndIvByUserPubKey;
		this.generatePasswordHash = generatePasswordHash;
		this.comparePassword = comparePassword;
		this.createToken = createToken;
		this.decodedJwt = decodedJwt;
		this.auth = auth;
		this.event = event;
	}

	emitUpdateRoomMessage(wss, room_id, usersRoom, decode, message, action) {
		this.event.emit('updateRoomMessage', wss, {
			room_id,
			usersRoom,
			decode,
			message: message,
			action,
		});
	}
}

module.exports = {
	BaseService,
};
