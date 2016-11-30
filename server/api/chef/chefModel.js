var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChefSchema = new Schema({
  name: {
    type: String,
    required: true
  }
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('tag', ChefSchema);
