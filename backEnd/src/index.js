const express = require("express");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

require("dotenv").config();

const jwtToken = process.env.JWTTOKEN;

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
  // hash password with bcrypt
  bcrypt.hash(body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ err: err });
    }
    // make user in db
    const user = new User({
      username: body.username.toLowerCase(),
      password: hash,
    });
    // save user in db and handle error and if ther is not error return some data
    user.save((err) => {
      if (err) {
        return res.json({ err: err });
      } else {
        const token = jwt.sign({ token: user._id }, jwtToken);
        res.json({ username: user.username, jwt: token });
      }
    });
  });
});

app.post("/api/v1/login", async (req, res) => {
  // Get post body
  const body = req.body;
  // get user from db
  User.findOne({ username: body.username }, (err, doc) => {
    if (err) {
      return res.json({ err: err });
    }
    if (!doc) {
      return res.json({ err: "username or password invalid" });
    }
    bcrypt.compare(body.password, doc.password, (err, same) => {
      if (err) {
        return res.json({ err: err });
      }
      if (!same) {
        return res.json({ err: "username or password invalid" });
      }
      const token = jwt.sign({ token: doc._id }, jwtToken);
      return res.json({ username: doc.username, jwt: token });
    });
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`I'm running at port ${PORT}`);
});
