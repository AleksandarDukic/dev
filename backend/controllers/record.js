const Record = require('../models/record');
const User = require('../models/user');

exports.createRecord =  (req, res, next) => {

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
