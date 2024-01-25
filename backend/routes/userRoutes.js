const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authmiddleware');
const {registerUser,  authUser, getAllUsers, onlineStatus} = require('../controllers/userControllers');
router.route("/").get(protect,getAllUsers)
router.route("/register").post(registerUser)
router.post("/login",authUser);
router.route("/status").put(protect,onlineStatus);

module.exports = router;
