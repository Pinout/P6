const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');

// Inscription d'un user
exports.signup = (req, res, next) => {
    // Validation du mot de passe
    var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (regex.test(req.body.password)) {
        // Crypte le mot de passe en faisant 10 tours
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                // Créé un nouvel utilisateur avec le hash du mot de passe
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        return res.status(401).json({ message: 'Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule et un nombre' });
    }
};

// Connexion d'un user
exports.login = (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password) // Compare le password envoyé avec le bon (bcrypt)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({ // Le backend renvoie un token au frontend
            userId: user._id,
            
            token: jwt.sign( // Nouveau token temporaire
              {
                userId: user._id
              },
              'RANDOM_TOKEN_SECRET',
              {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};