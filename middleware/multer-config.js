const multer = require('multer');

const MIME_TYPES = { // Extensions autorisées
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // Destination des images
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // Nouveau nom du fichier image pour éviter les doublons
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); // "<nom><Date>.<extension>"
    }
});
module.exports = multer({ storage: storage}).single('image'); 