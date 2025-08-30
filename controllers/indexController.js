const userModel = require("../models/user");

async function getIndex(req, res) {
  try {
    const members = await userModel.getAllUsernames();
    res.render("index", { title: "Login", user: req.user, members: members });
  } catch (error) {
    console.log(`Error loading home page: ${error}`);
    res.status(500).send("<p>Can not load the page</p>");
  }
}

module.exports = { getIndex };
