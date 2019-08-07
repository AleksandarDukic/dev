const express = require("express");
const RecordController = require("../controllers/record")
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post("/create", RecordController.createRecord);

router.post("/put_training", RecordController.putRecord);

router.get("/get_training", checkAuth, RecordController.getRecord);

router.put('', checkAuth, RecordController.updateRecord);

module.exports = router;
