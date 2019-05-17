const express = require("express");
const RecordController = require("../controllers/record")
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post("/create", RecordController.createRecord);

module.exports = router;
