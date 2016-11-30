var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LearningPathSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('tag', LearningPathSchema);
