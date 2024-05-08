const express = require("express");
const router = express.Router();
const MessageController = require("../../controllers/MessageController");
const auth = require("../../middleware/Auth");

router.get("/idea/messages/:ideaId", auth.auth, MessageController.getIdeaMessages);
router.post("/idea/message", auth.auth, MessageController.createIdeaMessage);

module.exports = router;