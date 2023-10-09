const { RoomService } = require('../services/room.service');

class RoomController {
	constructor() {
		this.roomService = new RoomService();
	}

	async createRoom(ws, ms, wss) {
		const { password, token } = ms;
		const result = await this.roomService.createRoom(password, token);
		ws.send(JSON.stringify(result));
	}

	async joinRoom(ws, ms, wss) {
		const { room_id, password, token } = ms;
		const result = await this.roomService.joinRoom(room_id, password, token, ws, wss);
		ws.send(JSON.stringify(result));
	}

	updateRoomStatus(ws, ms, wss) {
		ws.room = null;
	}

	async deleteRoom(ws, ms, wss) {
		const { room_id, token } = ms;
		const result = await this.roomService.deleteRoom(room_id, token, ws);
		ws.send(JSON.stringify(result));
	}
}

module.exports = {
	RoomController,
};
