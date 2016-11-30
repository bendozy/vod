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
    // show the one user
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

module.exports = router;
