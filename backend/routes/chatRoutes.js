const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const {accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controllers/chatControllers');
const router = express.Router();

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat)
router.route("/renamegroup").put(protect,renameGroup)
router.route("/removegroup").put(protect,removeFromGroup)
router.route("/groupAdd").put(protect,addToGroup)

module.exports = router;