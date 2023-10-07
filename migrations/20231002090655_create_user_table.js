/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('username').notNullable();
		table.text('pub_key');
		table.text('secret_answer');
		table.text('password').notNullable();
		table.text('token');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
