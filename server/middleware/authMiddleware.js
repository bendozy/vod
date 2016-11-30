var jwt = require('jsonwebtoken');

var secretKey = process.env.SECRET_KEY || 'vodvod';

module.exports = {
  checkUser: function (req, res, next) {
    jwt.verify(req.headers.vodauth, secretKey, function(err, decoded) {
      if (err) next(err);

      var user = decoded._doc;

      if (user._id) {
        req.currentUser = user;
        next();
      } else {
        next(new Error('There is an issue getting user'));
      }
    });
  },
  checkAdmin: function (req, res, next) {
    var user = req.currentUser;
    if (user.isAdmin) {
      next();
    } else {
      next(new Error('User is not an admin'));
    }
  }
}
