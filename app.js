require("dotenv").config();

const express = require("express");

const path = require("path");
const passport = require("passport");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db/pool");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const posts = require("./models/post");

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
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  res.locals.posts = await posts.getAllPostsWithAuthors();
  res.locals.user = req.user ? req.user : null;
  next();
});

app.get("/", (req, res) => {
  // console.log(res.locals.posts);
  res.render("index", { title: "Login", user: req.user });
});

app.use(
  "/users",
  (req, res, next) =>
    passport.authenticate("local", function (err, user, info, status) {
      if (err) {
        return next(err);
      }
      if (!req.user) {
        return res.redirect("/");
      }
      next();
    })(req, res, next),
  userRouter
);

app.use("/posts", postRouter);

app.use("/", authRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listen on port: ${process.env.HTTP_PORT}`);
});
