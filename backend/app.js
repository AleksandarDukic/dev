const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const userRoutes = require("./routes/user");
const videoRoutes = require("./routes/video");
const recordRoutes = require("./routes/record");

const app = express();

mongoose.connect("mongodb+srv://max:" + process.env.MONGO_ATLAS_PW + "@cluster0-mut6t.mongodb.net/node-angular")  // obrisali smo ?retryWrites=true
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed');
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})


// app.use("/api/posts", postsRoutes);
app.use("/api/record", recordRoutes);
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);

module.exports = app;


