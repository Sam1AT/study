const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  expierd: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model("users", schema);

module.exports = User;
