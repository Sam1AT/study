const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

const User = require("./models/User");

const UserValidate = require("./validate/UserValid");

mongoose.connect(
  "mongodb://localhost:27017/study",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("db is ok!");
    }
  }
);

app.use(express.json());

app.post("/api/v1/register", async (req, res) => {
  // Get post body
  const body = req.body;
  // validate username and password
  try {
    const uv = await UserValidate({
      username: body.username,
      password: body.password,
    });
  } catch (err) {
    return res.json({ err: err });
  }
  // make user in db
  const user = new User({
    username: body.username.toLowerCase(),
    password: body.password,
  });
  // save user in db and handle error and if ther is not error return some data
  user.save((err) => {
    if (err) {
      return res.json({ err: err });
    } else {
      res.json({ usernaem: user.username });
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`I'm running at port ${PORT}`);
});
