require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/userRouter");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("<h1>Hello Wolrd</h1>");
});

app.use("/users", userRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listen on port: ${process.env.HTTP_PORT}`);
});
