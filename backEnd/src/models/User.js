const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
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
schema.plugin(uniqueValidator);
const User = mongoose.model("users", schema);

module.exports = User;
