const { UserController } = require('./user.controller');
const { RoomController } = require('./room.controller');
const { MessageController } = require('./message.controller');

class SocketDispatcherController {
	constructor() {
		this.userController = new UserController();
		this.roomController = new RoomController();
		this.messageController = new MessageController();
		this.methods = {
			registerUser: (ws, ms, wss) => this.userController.registerUser(ws, ms, wss),
			login: (ws, ms, wss) => this.userController.login(ws, ms, wss),
			updateUser: (ws, ms, wss) => this.userController.updateUser(ws, ms, wss),
			createRoom: (ws, ms, wss) => this.roomController.createRoom(ws, ms, wss),
			joinRoom: (ws, ms, wss) => this.roomController.joinRoom(ws, ms, wss),
			deleteRoom: (ws, ms, wss) => this.roomController.deleteRoom(ws, ms, wss),
			updateRoomStatus: (ws, ms, wss) => this.roomController.updateRoomStatus(ws, ms, wss),
			sendMessage: (ws, ms, wss) => this.messageController.sendMessage(ws, ms, wss),
			getMessages: (ws, ms, wss) => this.messageController.getMessages(ws, ms, wss),
			deleteMessage: (ws, ms, wss) => this.messageController.deleteMessage(ws, ms, wss),
			updateMessage: (ws, ms, wss) => this.messageController.updateMessage(ws, ms, wss),
		};
	}

	async socketDispatcher(ws, ms, wss) {
		if (this.methods[ms.method]) {
			await this.methods[ms.method](ws, ms, wss);
		} else {
			ws.send('Invalid method');
		}
	}
}

module.exports = {
	SocketDispatcherController,
};
