var router = require('express').Router();
var recipeModel = require('./recipeModel');
var logger = require('../../util/logger');
var authMiddleware = require('../../middleware/authMiddleware');



router.get('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  recipeModel.find({}, function(err, recipes) {
    if (err) {
      return res.status(403).send(err);
    }
    // object of all the recipes
    res.status(200).send(recipes);
  });
});

router.get('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  recipeModel.findById(req.params.id, function(err, recipe) {
    if (err) {
      return res.status(403).send(err);
    }

    res.status(200).send(recipe);
  });
});

router.post('/', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {
  var newRecipe = recipeModel({
    name: req.body.name,
    userId: req.currentUser._id
  });

  // save the user
  newRecipe.save(function(err) {
    if (err) res.status(403).send(err);

    res.status(200).send(newRecipe);
  });
});

router.put('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  recipeModel.findById(req.params.id, function(err, recipe) {
    if (err) throw err;

    recipe.name = req.body.name;

    recipe.save(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send(recipe);
    });
  });
});

router.delete('/:id', authMiddleware.checkUser, authMiddleware.checkAdmin, function(req, res) {

  recipeModel.findById(req.params.id, function(err, recipe) {
    if (err) throw err;
    console.log('rr', recipe);

    recipe.remove(function(err) {
      if (err) {
        return res.status(403).send(err);
      }

      res.status(200).send({});
    });
  });
});

module.exports = router;
