require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require("./db/pool");

const app = express();

app.set("view engine", "ejs");
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(
    {
      usernameField: "user_name",
      passportField: "password",
    },
    async (username, password, done) => {
      try {
        const { rows } = await db.query(
          "SELECT * FROM users WHERE user_name = $1",
          [username]
        );
        console.log("call strategy");
        const user = rows[0];

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = ($1)", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => {
  res.render("index", { title: "Login", user: req.user });
});

app.get("/log-in", (req, res) => {
  res.render("index", {
    title: "Login",
  });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/users", userRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listen on port: ${process.env.HTTP_PORT}`);
});
