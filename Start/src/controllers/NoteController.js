const { response } = require("express");
const knex = require("../database/knex")
// importando o knex para esse arquivo

class NotesController {
    async create(request,response) {
        const { title, description, tags, links } = request.body; 
    // pegando os paramêtros body da requisição do insomnia
        const { user_id } = request.params;
    // pegando o user id que está vindo do request.params

        const [note_id] = await knex('notes').insert({
    // inserindo a nova nota, dentro de um array na primeira posição, já pegamos esse id que eu peguei do "user_id" e colocando dentro do "note_id"
    // inserir o title, description e o user_id no note_id
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
    // percorrer cada link que eu tenho e retornar o note_id e o url
    // criando um objeto novo, mudando o nome de link para url
            return {
                note_id,
                url: link
            }
        })

        await knex('links').insert(linksInsert);
    // vai pegar o arquivo links do banco de dados e inserir os links que foram inseridos no bloco de código acima

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex('tags').insert(tagsInsert);

        response.json();
    // vai retornar uma resposta em json
    }

    async show(request,response){
        const { id } = request.params
// recuperar o id que vai do request.params

        const note = await knex("notes").where({id}).first();
// selecionar a nota, usando o knex, pegando a pasta notes, usando o "where" para buscar pelo id como paramêtro, e pegar a primeira.
        const tags = await knex("tags").where({ note_id: id}).orderBy('name');
// buscando as tags e colocando em ordem alfabética com o "ordenBy"
        const links = await knex("links").where({ note_id: id}).orderBy('created_at');

        return response.json({
            ...note,
            tags,
            links
        })

    }

    async delete(request,response) {
        const { id } = request.params;

        await knex('notes').where({ id }).delete();

        return response.json();
    }

    async index(request,response){
        const { user_id, title, tags } = request.query;
// pegando o user_id por uma query passada na query do insomnia

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
// vai ficar as tags, usando a função "split" que serve para seperar o array pelo valor passado (",") e o map para executar uma determinada ação em todos os elementos do array, e o "trim" que remove os espaços em branco (whitespaces) do início e/ou fim de um texto.
        notes = await knex("tags")
        .select([
            "notes.id",
            "notes.title",
            "notes.user_id",
        ])
        .where("notes.user_id", user_id)
// filtrar basedo no id do usúario, filtrar pelas tags que seja por esse id do usúario que eu estou utilizando
        .whereLike('notes.title', `%${title}%` )
// buscar valores aproximados "whereLike("title", `%${title}%`)"
        .whereIn("name", filterTags)
// whereIn para analisar baseado na tag, pegar o name (nome da tag) e passar o vetor que eu quero que ele compare,
        .innerJoin('notes', "notes.id", "tags.note_id")
// para juntar as informações que batem entre as notas e tags
        .orderBy('notes.title')
// ordenar pelo titulo
        } else {
        notes = await knex('notes').where({ user_id }).whereLike("title", `%${title}%`).orderBy('title')
// buscar as notas criadas pelo usúario expecifico passado pelo "user_id", usando o "ordenBy" para ordenar pelo título.
// buscar valores aproximados "whereLike("title", `%${title}%`)"
        }   

        const userTags = await knex('tags').where({ user_id });
// fazer um filtro em todas as tags, onde a tag seja igual o id do usuário "user_id"  
        const notesWithTags = notes.map(note => {
// agora vai passar as "notes" pela função "map", que vai separar cada uma e dar o nome de "note"
            const noteTags = userTags.filter(tag => tag.note_id === note.id)
// depois vai filtrar as tags parar saber quais tag que possuem o id identico ao id da nota.

            return {
                ...note,
                tags:noteTags
            }
// aqui vai pegar e retornar a nota e adicionar ('espalhar') as tags filtradas
        });

        return response.json(notesWithTags)
// e aqui vai retornar as notas com tags 
    }
}



module.exports = NotesController
// exportando a class para caso outro arquivo que precise utiliza-lo 