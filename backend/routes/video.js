const express = require("express");

const VideoController = require("../controllers/video")
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post("/postVideo", VideoController.addVideo);

router.get("/getVideos", VideoController.getVideos);

module.exports = router;
