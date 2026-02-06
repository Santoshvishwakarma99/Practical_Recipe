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
  res.render('recipeForm', { recipe: null });
};


exports.createRecipe = async (req, res) => {
  const recipe = await Recipe.create({
    ...req.body,
    createdBy: req.user.id
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { recipes: recipe._id }
  });

  res.redirect('/recipes');
};

// 👇 NEW
exports.viewRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
  res.render('recipeItem', { recipe });
};

exports.editForm = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipeForm', { recipe });
};

exports.updateRecipe = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/recipes');
};

exports.deleteRecipe = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect('/recipes');
};
