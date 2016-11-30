var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  facebook: {
    type: String,
    unique: true,
    required: false
  },
  google: {
    type: String,
    unique: true,
    required: false
  },
  isAdmin: {
    type: Boolean,
    unique: true,
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);
