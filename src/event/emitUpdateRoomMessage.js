const { event } = require('../event/eventEmitter');

function emitUpdateRoomMessage(data) {
	event.emit('updateRoomMessage', data.wss, {
		room_id: data.room_id,
		usersRoom: data.usersRoom,
		decode: data.decode,
		message: data.message,
		action: data.action,
	});
}

module.exports = {
	emitUpdateRoomMessage,
};
