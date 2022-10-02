const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;