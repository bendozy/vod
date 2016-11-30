var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('recipe', RecipeSchema);
