const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
      });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created',
          result: result
        });
      })
      .catch(err => {               // ovde hvatamo gresku ako imamo isti email koji je provalio moonguse-unque-validator
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  let admin = false;
  User.findOne({ email: req.body.email })
  .then( user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    console.log(fetchedUser);
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    if (fetchedUser.admin){
      admin = true;
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id, admin: admin },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    console.log(fetchedUser.apol);
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      pol: fetchedUser.gender,     //////////////////////////////
      admin: admin,
      pending: fetchedUser.pending,
      training: fetchedUser.training
    })
  })
  .catch(err => {
      return res.status(401).json({
      message: "Invalid authentication credentials"
    })
  })
}

exports.updateUser = (req, res ,next) => {
  let fetchedUser = new User({
    _id: req.params.id,
    admin: false,
    gender: req.body.gender,
    height: req.body.height,
    weight: req.body.weight,
    ever: req.body.ever,
    mth: req.body.mth,
    hurt: req.body.hurt,
    diss: req.body.diss,
    smoke: req.body.smoke,
    alch: req.body.alch,
    work: req.body.work,
    pending: false,
    training: false
  });
  User.updateOne(
    { _id: fetchedUser._id }, fetchedUser
  ).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: 'Update successful!' })
    } else {
      res.status(401).json({ message: 'Not authorized' })
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post!"
    });
  });
}

exports.getUser = (req, res, next) => {
  let fetchedUser;
  console.log('!!!!!!!REQ userData!!!!!!!!!!!!' + req.userData.email);
  User.findOne(
    { email: req.userData.email }
  )
  .then(result => {

    let gender = result.gender;
    let weight = result.weight;
    let height = result.height;
    let ever = result.ever;
    let mth = result.mth;
    let hurt = result.hurt;
    let diss = result.diss;
    let alch = result.alch;
    let smoke = result.smoke;
    let work = result.work;
    let pending = result.pending;
    let training = result.training

    res.status(200).json({
      gender: gender,
      weight: weight,
      height: height,
      ever: ever,
      mth: mth,
      hurt: hurt,
      diss: diss,
      alch: alch,
      smoke: smoke,
      work: work,
      pending: pending,
      training: training
     });
  })
  .catch(error => {
    res.status(500).json({
      message: "User not found"
    });
  });
}

exports.getPending = (req, res, next) => {
  User.find({pending: true})
    .then(result => {
      res.status(200).json({
        message: "Pending fetched successfully",
        users: result
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching pending failed"
      })
    })
}
