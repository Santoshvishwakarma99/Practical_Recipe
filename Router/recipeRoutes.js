const express = require('express');
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const { verifyToken } = require('../Middleware/authMiddleware');
const { allowRoles } = require('../Middleware/roleMiddleware');

router.get('/', verifyToken, recipeController.getAllRecipes);
router.get('/my', verifyToken, recipeController.getMyRecipes);
router.get('/new', verifyToken, recipeController.showForm);
router.post('/new', verifyToken, recipeController.createRecipe);

// Only admin can delete
router.get('/delete/:id', verifyToken, allowRoles('admin'), recipeController.deleteRecipe);

module.exports = router;
