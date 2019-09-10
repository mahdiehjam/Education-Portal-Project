const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 

  name:{
    type: String,
    required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  }
  , password: {
    type: String,
    unique: true,
    required: true,
  },
  avatar:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);