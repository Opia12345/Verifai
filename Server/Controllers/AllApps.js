const { App } = require("../Models/User");

exports.allApps = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const apps = await App.find({ userId });
    if (apps.length === 0) {
      return res
        .status(404)
        .json({ message: "No apps found for this user ID" });
    }
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apps" });
  }
};
