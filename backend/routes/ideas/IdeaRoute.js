const express = require("express");
const router = express.Router();
const IdeaController = require("../../controllers/IdeaController");
const auth = require("../../middleware/Auth");

router.get("/ideas", IdeaController.getIdeas);
router.get("/idea/:ideaId", IdeaController.getIdea);
router.delete("/idea/:ideaId", auth.auth, IdeaController.deleteIdea);
router.patch("/idea/:ideaId", auth.auth, IdeaController.updateIdea);
router.post("/idea", auth.auth, IdeaController.createIdea);

module.exports = router;