async function loginGet(req, res) {
  res.render("index", { title: "User Login" });
}

module.exports = {
  loginGet,
};
