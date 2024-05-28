const { App } = require("../Models/User");
const yup = require("yup");

const Validation = yup.object().shape({
  appName: yup.string().required("App Name is required"),
});

exports.UpdateAppName = async (req, res) => {
  const { appName } = req.body;
  const { userId } = req.params;

  try {
    await Validation.validate({ appName }, { abortEarly: false });

    const App = await App.findOne({ _id: userId });

    if (!App) {
      return res.status(404).json({ message: "App not found" });
    }

    user.appName = appName;

    await App.save();

    res.status(200).json({
      message: "App Name updated successfully",
    });
  } catch (error) {
    let errorMessage = "An error occurred";
    res.status(400).json({ message: errorMessage });
  }
};
