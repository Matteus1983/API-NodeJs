const path = require("path");
  // lidar com endereço independente do arquivo operacional ( window,linux,mac )

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
  // resolve esse endereço, vai ir nesse caminho independente do arquivo operacional
    pool: {
  // pool é uma funcionalidade que vai ser executado no momento em que estabelecer conexão com o banco de dados
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
  // pegar a conexão e rodar um comando 'PRAGMA foreign_keys = ON', para habilitar a funcionalidade CASCADE de excluir uma nota, excluir tbm suas tags e links vinculados e td mais q tiver vinculo a ela.
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
  // automatizar a criação de tabelas na nossa aplicação

    useNullAsDefault: true
  // useNullAsDefault, propriedade padrão para trabalhar com o sqlite
  }
};
