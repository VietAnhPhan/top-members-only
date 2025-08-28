require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require("path");
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db/pool");

const app = express();

app.set("view engine", "ejs");
app.set("view engine", "ejs");

require("./configs/passport");

app.use(
  session({
    store: new pgSession({
      pool: db,
      tableName: "session",
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } 
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Login", user: req.user });
});

app.use("/users", userRouter);

app.use("/", authRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listen on port: ${process.env.HTTP_PORT}`);
});
