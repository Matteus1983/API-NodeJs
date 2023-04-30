const { Router } = require("express");

const NotesController = require('../controllers/NoteController')

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.get("/", notesController.index);
// listar todas as notas cadastradas

notesRoutes.post("/:user_id", notesController.create);
// criar uma nota

notesRoutes.get("/:id", notesController.show);
// mostrar a nota

notesRoutes.delete("/:id", notesController.delete);
// deletar uma nota

module.exports = notesRoutes;