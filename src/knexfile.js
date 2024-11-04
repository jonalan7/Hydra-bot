// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/ws/lessons/lessons.db3`,
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/ws/migrations`,
    },
  },
};
