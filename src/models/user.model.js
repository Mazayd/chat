const { BaseModel } = require('./base.model');

class UserModel extends BaseModel {
	async createUser(data) {
		return await this.db('users').insert(data).returning('id');
	}

	async getUserByUserName(username) {
		return await this.db('users').select('*').where({ username });
	}

	async getUserById(id) {
		return await this.db('users').select('*').where({ id });
	}

	async updateUserById(id, data) {
		return await this.db('users').where({ id }).update(data);
	}
}

module.exports = {
	UserModel,
};
