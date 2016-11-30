var chefRouter = require('express').Router();
var chefModel = require('./chefModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



chefRouter.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  chefModel.find({}, function(err, categories) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(categories);
  });
});

chefRouter.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  chefModel.findById(req.params.id, function(err, chef) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(chef);
  });
});

chefRouter.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var newChef = chefModel({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    description: req.body.description,
    userId: req.currentUser._id
  });

  // save the user
  newChef.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newChef);
  });
});

chefRouter.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  chefModel.findById(req.params.id, function(err, chef) {
    if (err) throw err;

    chef.name = req.body.name;
    chef.thumbnail =  req.body.thumbnail;
    chef.description =  req.body.description;

    chef.save(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send(chef);
    });
  });
});

chefRouter.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  chefModel.findById(req.params.id, function(err, chef) {
    if (err) throw err;

    chef.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = chefRouter;
