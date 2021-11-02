const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Package pour la validation des emails

// Modèle pour un User
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // Utilisation du package pour la validation des emails

module.exports = mongoose.model('User', userSchema);