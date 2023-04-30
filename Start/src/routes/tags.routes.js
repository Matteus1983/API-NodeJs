const { Router } = require("express");
// lidar com requisições feita na web, pelo protocolo http, muito rapido e flexivel

const TagsController = require('../controllers/TagsController')
// trazendo tudo do arquivo TagsController.js para cá

const tagsRoutes = Router();
// utilizando o Router que vem do express

const tagsController = new TagsController();
// criando a class contrutora

tagsRoutes.get("/:user_id", tagsController.index);
// listar todas as notas cadastradas


module.exports = tagsRoutes;