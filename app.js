const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");

require('dotenv').config();

const app = express();

app.set('view engine', 'html');

// Connexion mongoose
mongoose.connect('mongodb+srv://' + process.env.USER + ':' + process.env.PASS + '@cluster0.ayvcw.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true,
     useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers CSP
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.static(__dirname + '/views'));
express.static('views')


app.use(bodyParser.json());

app.use(mongoSanitize()); // mongo-sanitize to prevent operator injection
app.use(helmet()); // helmet

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;