const { BaseController } = require('./base.controller');

class MessageController extends BaseController {
	async sendMessage(ws, ms, wss) {
		const { room_id, data, token } = ms;
		const result = await this.messageService.sendMessage(room_id, data, token, wss);
		ws.send(JSON.stringify(result));
	}

	async getMessages(ws, ms, wss) {
		const { page = 1, pageSize = 10, token, room_id } = ms;
		const offset = (page - 1) * pageSize;
		const result = await this.messageService.getMessages(pageSize, token, room_id, offset);
		ws.send(JSON.stringify(result));
	}

	async deleteMessage(ws, ms, wss) {
		const { message_id, token } = ms;
		const result = await this.messageService.deleteMessage(message_id, token, wss);
		ws.send(JSON.stringify(result));
	}

	async updateMessage(ws, ms, wss) {
		const { message_id, token, data } = ms;
		const result = await this.messageService.updateMessage(message_id, token, data, wss);
		ws.send(JSON.stringify(result));
	}
}

module.exports = {
	MessageController,
};
