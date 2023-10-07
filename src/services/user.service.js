const { BaseService } = require('./base.service');

class UserService extends BaseService {
	async registerUser(username, password, secret_answer, ws) {
		const candidate = await this.userModel.getUserByUserName(username);
		if (candidate.length) {
			return { success: false, message: 'User with such username is registered.' };
		}
		const hashPassword = await this.generatePasswordHash(password);
		const secretAnswerHash = await this.generatePasswordHash(secret_answer);
		const [newUser] = await this.userModel.createUser({
			username,
			password: hashPassword,
			secret_answer: secretAnswerHash,
		});
		const token = this.createToken({ id: newUser.id, username });
		await this.userModel.updateUserById(newUser.id, { token });
		ws.id = newUser;
		return { success: true, message: 'User created', token };
	}

	async login(username, password, secret_answer, ws) {
		const user = await this.userModel.getUserByUserName(username);
		if (!user.length) {
			return { success: false, message: 'The user with this username is not registered.' };
		}
		if (!(await this.comparePassword(password, user[0].password))) {
			return { success: false, message: 'Incorrect password.' };
		}
		if (!(await this.comparePassword(secret_answer, user[0].secret_answer))) {
			return { success: false, message: 'Incorrect secret ansfer.' };
		}
		const token = this.createToken({ id: user[0].id, username: user[0].username });
		await this.userModel.updateUserById(user[0].id, { token });
		ws.id = user[0].id;
		return { success: true, message: 'The user has logged in.', token };
	}

	async updateUser(token, username, pub_key) {
		try {
			const decode = await this.auth(token);
			await this.userModel.updateUserById(decode.id, { username, pub_key });
			return { success: true, message: 'User updated.' };
		} catch (error) {
			console.log('error.message :>> ', error.message);
			return { success: false, message: error.message };
		}
	}
}

module.exports = {
	UserService,
};
