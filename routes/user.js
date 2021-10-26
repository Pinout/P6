const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// Définition des actions à appliquer pour chaque route
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;