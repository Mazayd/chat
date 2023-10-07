/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users_room', (table) => {
		table.integer('room_id');
		table.integer('user_id');
		table.foreign('room_id').references('id').inTable('rooms');
		table.foreign('user_id').references('id').inTable('users');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('users_room');
};
