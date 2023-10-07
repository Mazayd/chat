// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'postgres',
		database: 'chat',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};
