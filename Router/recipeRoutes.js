const express = require('express');
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const { verifyToken } = require('../Middleware/authMiddleware');
const { allowRoles } = require('../Middleware/roleMiddleware');

router.get('/', verifyToken, recipeController.getAllRecipes);
router.get('/my', verifyToken, recipeController.getMyRecipes);
router.get('/new', verifyToken, recipeController.showForm);
router.post('/new', verifyToken, recipeController.createRecipe);

// View single recipe
router.get('/view/:id', verifyToken, recipeController.viewRecipe);

// Edit recipe
router.get('/edit/:id', verifyToken, recipeController.editForm);
router.post('/edit/:id', verifyToken, recipeController.updateRecipe);

// Delete recipe (admin only)
router.get('/delete/:id', verifyToken, recipeController.deleteRecipe);


module.exports = router;
