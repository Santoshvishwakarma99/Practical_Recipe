const Recipe = require('../Model/recipe');
const User = require('../Model/user');

exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find().populate('createdBy', 'username');
  res.render('recipeList', { recipes, user: req.user });
};

exports.getMyRecipes = async (req, res) => {
  const recipes = await Recipe.find({ createdBy: req.user.id });
  res.render('myRecipe', { recipes });
};

exports.showForm = (req, res) => {
  res.render('recipeForm');
};

exports.createRecipe = async (req, res) => {
  const recipe = await Recipe.create({ ...req.body, createdBy: req.user.id });
  await User.findByIdAndUpdate(req.user.id, { $push: { recipes: recipe._id } });
  res.redirect('/recipe');
};

exports.deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect('/recipe');
};
