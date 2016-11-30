var categoryRouter = require('express').Router();
var categoryModel = require('./categoryModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



categoryRouter.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  categoryModel.find({}, function(err, categories) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(categories);
  });
});

categoryRouter.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  categoryModel.findById(req.params.id, function(err, category) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(category);
  });
});

categoryRouter.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var newCategory = categoryModel({
    name: req.body.name,
    userId: req.currentUser._id
  });

  // save the user
  newCategory.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newCategory);
  });
});

categoryRouter.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  categoryModel.findById(req.params.id, function(err, category) {
    if (err) throw err;

    category.name = req.body.name;

    category.save(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send(category);
    });
  });
});

categoryRouter.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  categoryModel.findById(req.params.id, function(err, category) {
    if (err) throw err;

    category.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = categoryRouter;
