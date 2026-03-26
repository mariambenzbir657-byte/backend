const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/:parentId/:babysitterId",protect,authorize(["Parent","BabySitter"]) ,messageController.getMessages);

router.post("/envoyer",protect,authorize(["Parent","BabySitter"]), messageController.sendMessage);

module.exports = router;