// processo de criar a tabela
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments('id');
    // text porq vai ser do tipo texto
    table.text('title')
    table.text('description')
    // integer porq vai ser um número do tipo inteiro, que vai fazer uma referência ao ID que existe dentro da tabela do "users"
    table.integer('user_id').references('id').inTable('users')
    // criar o timestamp do tipo at, função fn e now que vai gerar o timestamp
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

// processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("notes");
