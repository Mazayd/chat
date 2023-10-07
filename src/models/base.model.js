const knexConfig = require('../../knexfile');
const knex = require('knex');

class BaseModel {
	constructor() {
		this.db = knex(knexConfig);
	}
}

module.exports = {
	BaseModel,
};
