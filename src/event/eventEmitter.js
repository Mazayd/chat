const EventEmitter = require('events');

const event = new EventEmitter();

event.on('updateRoomMessage', (wss, data) => {
	wss.clients.forEach((client) => {
		if (
			client.room === data.room_id &&
			data.usersRoom.some((obj) => obj.user_id === client.id && client.id !== data.decode.id)
		) {
			client.send(JSON.stringify({ action: data.action, message: data.message }));
		}
	});
});

module.exports = {
	event,
};
