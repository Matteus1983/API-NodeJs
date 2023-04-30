const knex = require("../database/knex")

class TagsController {
    async index (request, response) {
// index vai ser responsavel para listar todas as tags cadastradas do usuário
        const { user_id } = request.params;
// pegar o id que está vindo do paramêtro (8)

        const tags = await knex('tags').where({ user_id })
// knex vai nas tags e busca as que seja igual ao user_id (8)

        return response.json(tags)
// retornando em formato de json as tags, que futuramente será impresso no insomnia
    }
}

module.exports= TagsController