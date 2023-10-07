const { BaseModel } = require('./base.model');

class MessageModel extends BaseModel {
	async createMessage(data) {
		return await this.db('messages').insert(data).returning('*');
	}

	async deletedMessagesByRoomId(room_id) {
		return await this.db('messages').where({ room_id }).del('id');
	}

	async getMessagesByRoom(room_id, pageSize, offset) {
		return await this.db('messages')
			.select('*')
			.where({ room_id })
			.orderBy('created_at', 'desc')
			.limit(pageSize)
			.offset(offset);
	}

	async getMessageById(id) {
		return await this.db('messages').select('*').where({ id });
	}

	async deleteMessageById(id) {
		return await this.db('messages').where({ id }).del('id');
	}

	async updateMessageById(id, data) {
		return await this.db('messages').where({ id }).update(data).returning('*');
	}
}

module.exports = {
	MessageModel,
};
