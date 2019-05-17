const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/getuser", checkAuth, UserController.getUser);

router.put("/:id", UserController.updateUser);

router.get("/getpending", checkAuth, UserController.getPending);

module.exports = router;

