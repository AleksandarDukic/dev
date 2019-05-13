const Video = require('../models/video');

exports.addVideo = (req, res, next) => {

  let video = new Video({
    name: req.body.name,
    link: req.body.link,
    note: req.body.note,
    type: req.body.type
  });
  // console.log(video.name, video.link, video.note, video.type)
  video.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Post added succesfully'
    })
  })
    .catch(error => {
      res.status(500).json({
        message: 'Couldn\t update post!'
      })
    })
};

exports.getVideos = (req, res, next) => {
  Video.find()
    .then(documents => {
      res.status(200).json({
        message: "Videos fetched successfully",
        vids: documents
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching vids failed"
      })
    })
}
