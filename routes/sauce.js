const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');
// Pour renforcer l'authentification sur les routes relatives à la sauce
const auth = require('../middleware/auth');
// Pour gérer les images
const multer = require('../middleware/multer-config');

// Définition des actions à appliquer pour chaque route
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.get('/:id', auth, sauceController.getOneSauce)
router.get('/', auth, sauceController.getAllSauces);
router.post('/:id/like', auth, sauceController.likeDislikeSauce);

module.exports = router;