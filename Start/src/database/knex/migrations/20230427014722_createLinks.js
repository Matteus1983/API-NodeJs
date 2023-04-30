exports.up = knex => knex.schema.createTable("links", table => {
    // processo de criar o link

    table.increments('id');
    // increments para ir aumentando o id conforme for criando os itens da tabela


    table.text('url').notNullable();
    // notNullable não aceita nulo
    // text porq vai ser do tipo texto 

    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE")
    // integer porq vai ser um número do tipo inteiro, que vai fazer uma referência ao ID que existe dentro da tabela do "users"
    // onDelete para caso eu delete uma nota, eu tbm delete as tags vinculadas a ela

    table.timestamp("created_at").default(knex.fn.now())
    // quando o link for criado

})

exports.down = knex => knex.schema.dropTable("links");
    // processo de deletar o link
