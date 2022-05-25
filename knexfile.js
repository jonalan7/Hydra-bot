const fs = require('fs');
const dirt = './src/ws/lessons';
if (!fs.existsSync(dirt)) {
  fs.mkdirSync(dirt);
}

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${dirt}/lessons.db3`,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/ws/migrations/',
    },
  },
};
