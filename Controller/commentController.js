const Comment = require('../Model/comment');

exports.addComment = async (req, res) => {
  await Comment.create({
    text: req.body.text,
    recipe: req.body.recipeId,
    user: req.user.id
  });
  res.redirect('/recipe');
};
