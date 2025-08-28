async function loginGet(req, res) {
  res.render("login", { title: "User Login" });
}

module.exports = {
  loginGet,
};
