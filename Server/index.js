const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./Models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


//CONFIGURATIONS
const app = express();
const path = __dirname + "/views/";
const port = process.env.port || 8080;
app.use(express.static(path));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log(`Loading...`);
    app.listen(port, () => {
      console.log(`Server running on ${port} and MongoDB connected`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
