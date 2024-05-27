const { User, App } = require("../Models/User");
const bcrypt = require("bcrypt");
const saltRounds = 15;
const Yup = require("yup");

const Validation = Yup.object().shape({
  appName: Yup.string().required("App Name is required"),
  appEmail: Yup.string().required("Email Address is required"),
  appPassword: Yup.string().required("Password is required"),
  appUrl: Yup.string(),
});

exports.App = async (req, res) => {
  const { appName, appEmail, appPassword, appUrl } = req.body;

  try {
    const validationSchema = Validation;
    await validationSchema.validate(
      { appName, appEmail, appPassword, appUrl },
      { abortEarly: false }
    );

    const hashedPassword = await bcrypt.hash(appPassword, saltRounds);

    const newUser = new App({
      appName,
      appEmail,
      appPassword: hashedPassword,
      appUrl,
    });

    await newUser.save();

    const response = { message: "App Password Created successfully" };

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
};
