/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('rooms', (table) => {
		table.increments('id').primary();
		table.integer('owner_id');
		table.foreign('owner_id').references('id').inTable('users');
		table.text('password').notNullable();
		table.text('room_key').notNullable();
		table.text('room_iv').notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('rooms');
};
