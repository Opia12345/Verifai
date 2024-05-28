const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Register = require("./Controllers/Register");
const updateEmail = require("./Controllers/UpdateEmail");
const updatePassword = require("./Controllers/UpdatePassword");
const signIn = require("./Controllers/SignIn");
const PasswordReset = require("./Controllers/ResetPassword");
const resendVerification = require("./Controllers/ResendVerification");
const ResendOTP = require("./Controllers/ResendOTP");
const OTPConfirmation = require("./Controllers/OTPConfirmation");
const logout = require("./Controllers/Logout");
const Delete = require("./Controllers/Delete");
const App = require("./Controllers/App");
const updateUsername = require("./Controllers/UpdateUsername");
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
app.post("/logout", logout.logout);
app.delete(`/users/delete/:userId`, Delete.Delete);
app.patch(`/email-update/:userId`, updateEmail.updateEmail);
app.patch(`/username-update/:userId`, updateUsername.updateUsername);
app.patch(`/password-update/:userId`, updatePassword.updatePassword);
app.post("/passwordReset", PasswordReset.PasswordReset);
app.post("/resend-verification/:userId", resendVerification.resendVerification);
app.post("/resend-OTP/:userId", ResendOTP.ResendOTP);
app.post("/OTPConfirmation", OTPConfirmation.OTPConfirmation);

//APP ENDPOINTS
app.post("/create-app", App.App);
