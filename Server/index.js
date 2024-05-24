const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./Models/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Register = require("./Controllers/Register");
const updateEmail = require("./Controllers/UpdateEmail");
const updatePassword = require("./Controllers/UpdatePassword");
const signIn = require("./Controllers/SignIn");
const PasswordReset = require("./Controllers/ResetPassword");
const resendVerification = require("./Controllers/ResendVerification");
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

app.post("/register", Register.Register);
app.post("/signin", signIn.signIn);
app.patch(`/email-update/:userId`, updateEmail.updateEmail);
app.patch(`/password-update/:userId`, updatePassword.updatePassword);
app.post("/passwordReset", PasswordReset.PasswordReset);
app.post("/resend-verification/:userId", resendVerification.resendVerification);
