var learningPathRouter = require('express').Router();
var learningPathModel = require('./learningPathModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



learningPathRouter.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  learningPathModel.find({}, function(err, learningPaths) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(learningPaths);
  });
});

learningPathRouter.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  learningPathModel.findById(req.params.id, function(err, learningPath) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(learningPath);
  });
});

learningPathRouter.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var newLearningPath = learningPathModel({
    name: req.body.name,
    userId: req.currentUser._id
  });

  // save the user
  newLearningPath.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newLearningPath);
  });
});

learningPathRouter.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  learningPathModel.findById(req.params.id, function(err, learningPath) {
    if (err) throw err;

    learningPath.name = req.body.name;

    learningPath.save(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send(learningPath);
    });
  });
});

learningPathRouter.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  learningPathModel.findById(req.params.id, function(err, learningPath) {
    if (err) throw err;

    learningPath.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = learningPathRouter;
