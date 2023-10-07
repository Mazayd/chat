const { BaseModel } = require('./base.model');

class RoomModel extends BaseModel {
	async createRoom(data) {
		return await this.db('rooms').insert(data).returning('id');
	}

	async addUserToRoom(room_id, user_id) {
		await this.db('users_room').insert({ room_id, user_id });
	}

	async getRoomById(id) {
		return await this.db('rooms').select('*').where({ id });
	}

	async getUsersRoom(room_id) {
		return await this.db('users_room').select('*').where({ room_id });
	}

	async updateRoomById(id, data) {
		return await this.db('rooms').where({ id }).update(data).returning('*');
	}

	async deleteRoom(id) {
		return await this.db('rooms').where({ id }).del('id');
	}

	async deleteUsersRoom(room_id) {
		return await this.db('users_room').where({ room_id }).del('*');
	}
}

module.exports = {
	RoomModel,
};
