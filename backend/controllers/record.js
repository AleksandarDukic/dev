const Record = require('../models/record');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createRecord = (req, res, next) => {

  let user_id = req.body.userId;
  const record = new Record ({
    user_id: req.body.userId,
    date: req.body.date
  });
  record.save().then(result => {
    User.updateOne({_id: user_id}, {pending: true}).then(() => {
      res.status(201).json({
        message: 'Record created',
        result: result
      })
    })
    .catch(err => {               // ovde hvatamo gresku ako imamo isti email koji je provalio moonguse-unque-validator
      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    });
  });
}

exports.putRecord = (req, res,next) => {
  let user_id = req.body._id;
  console.log(req.body._id);
  console.log(req.body.note);
  console.log(req.body.selectedVids);
  Record.updateOne(
    {user_id: req.body._id, quality: undefined},
    { excercises: req.body.selectedVids, note: req.body.note}
  ).then(
    result => {
      User.updateOne(
        {_id: user_id},
        { pending: false, training: true}
      )
      .then(result =>{
        res.status(201).json({
          message: 'Record updated',
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid!"
      });
    })
    }
  //Record.updateOne( {_id: req.body._id}, {quality: undefined}). then (() => {

exports.getRecord = (req, res, next) => {
  console.log(req.userData.userId);
  Record.findOne(
    {user_id: req.userData.userId, quality: undefined}
  )
  .then(result => {
    console.log("RECORD " + result._id, result.excercises);
    res.status(200).json({
      record: result
    })
  })
  .catch(error => {
    res.status(500).json({
      message: "no such record"
    });
  })
}
