const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middleware/authMiddleware');
const commentController = require('../Controller/commentController');

router.post('/add', verifyToken, commentController.addComment);

module.exports = router;
