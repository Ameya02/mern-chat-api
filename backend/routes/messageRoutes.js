const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmiddleware');
const { sendMessage, receiveMessage, sendMessageFile } = require('../controllers/messageControllers');

router.route("/").post(protect,sendMessage);
router.route("/file").post(protect,sendMessageFile);

router.route("/:chatId").get(protect,receiveMessage);


module.exports = router;