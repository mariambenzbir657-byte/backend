const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// جلب الرسائل بين parent و babysitter
router.get("/:parentId/:babysitterId", messageController.getMessages);

// إرسال رسالة
router.post("/envoyer", messageController.sendMessage);

module.exports = router;