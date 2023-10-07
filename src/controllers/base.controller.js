const { UserService } = require('../services/user.service');
const { RoomService } = require('../services/room.service');
const { MessageService } = require('../services/message.service');

class BaseController {
	constructor() {
		this.userService = new UserService();
		this.roomService = new RoomService();
		this.messageService = new MessageService();
	}
}

module.exports = {
	BaseController,
};
