var tagRouter = require('express').Router();
var tagModel = require('./tagModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



tagRouter.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  tagModel.find({}, function(err, tags) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(tags);
  });
});

tagRouter.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  tagModel.findById(req.params.id, function(err, tag) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(tag);
  });
});

tagRouter.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var newTag = tagModel({
    name: req.body.name,
    userId: req.currentUser._id
  });

  // save the user
  newTag.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newTag);
  });
});

tagRouter.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  tagModel.findById(req.params.id, function(err, tag) {
    if (err) throw err;

    tag.name = req.body.name;

    tag.save(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send(tag);
    });
  });
});

tagRouter.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  tagModel.findById(req.params.id, function(err, tag) {
    if (err) throw err;

    tag.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = tagRouter;
