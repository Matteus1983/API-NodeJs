exports.up = knex => knex.schema.createTable("tags", table => {
    // processo de criar a tag

    table.increments('id');
    // increments para ir aumentando o id conforme for criando os itens da tabela

    table.text('name').notNullable();
    // text porq vai ser do tipo texto

    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE")
    // integer porq vai ser um número do tipo inteiro, que vai fazer uma referência ao ID que existe dentro da tabela do "users"
    // onDelete para caso eu delete uma nota, eu tbm delete as tags vinculadas a ela

    table.integer('user_id').references('id').inTable('users')
    // para que o user id da tag esteja vinculado ao id da tabela users

})

exports.down = knex => knex.schema.dropTable("tags");
    // processo de deletar a tag
