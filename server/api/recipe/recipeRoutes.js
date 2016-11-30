var recipeRouter = require('express').Router();
var recipeModel = require('./recipeModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



recipeRouter.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  recipeModel.find({}, function(err, recipes) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(recipes);
  });
});

recipeRouter.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  recipeModel.findById(req.params.id, function(err, recipe) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(recipe);
  });
});

recipeRouter.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var recipe = req.body;
  recipe.userId = req.currentUser._id;
  var newRecipe = recipeModel(recipe);

  // save the user
  newRecipe.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newRecipe);
  });
});

recipeRouter.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  recipeModel.findOneAndUpdate({_id:req.params.id}, req.body, function (err, recipe) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(recipe);
  });
});

recipeRouter.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  recipeModel.findById(req.params.id, function(err, recipe) {
    if (err) throw err;

    recipe.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = recipeRouter;
