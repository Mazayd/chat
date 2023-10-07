const { BaseController } = require('./base.controller');

class UserController extends BaseController {
	async registerUser(ws, ms, wss) {
		const { username, password, secret_answer } = ms;
		const result = await this.userService.registerUser(username, password, secret_answer, ws);
		ws.send(JSON.stringify(result));
	}

	async login(ws, ms, wss) {
		const { username, password, secret_answer } = ms;
		const result = await this.userService.login(username, password, secret_answer, ws);
		ws.send(JSON.stringify(result));
	}

	async updateUser(ws, ms, wss) {
		const { token, username, pub_key } = ms;
		const result = await this.userService.updateUser(token, username, pub_key);
		ws.send(JSON.stringify(result));
	}
}
module.exports = {
	UserController,
};
