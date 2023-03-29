const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  price: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  price_per_month: {
    type: String,
  },
  price_per_week: {
    type: String,
  },
  no_of_bedroom: {
    type: String,
  },
  no_of_bathroom: {
    type: String,
  },

});

module.exports = mongoose.model("User", userSchema);