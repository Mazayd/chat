/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('messages', (table) => {
		table.increments('id').primary();
		table.text('data');
		table.integer('owner_id');
		table.foreign('owner_id').references('id').inTable('users');
		table.integer('room_id');
		table.foreign('room_id').references('id').inTable('rooms');
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('messages');
};
