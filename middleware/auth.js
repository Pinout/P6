const jwt = require('jsonwebtoken'); // Package pour la sécuriser les échanges

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];         // On récupère le token de la requête entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// On vérifie le token
        const userId = decodedToken.userId;                          // On récupère l'id du token
        if (req.body.userId && req.body.userId !== userId) {        // On compare le userId de la requête à celui du token
            throw 'User id non valable !';
        } else {
            next();
        }
    } catch(error){ // Erreur requête
        res.status(401).json({ error: new Error('Requête invalide !')});
    }
};