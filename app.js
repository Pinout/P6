const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");

const app = express();

require('dotenv').config();
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

app.set('view engine', 'html');

// Connexion mongoose
mongoose.connect(`mongodb+srv://Yann:yann@cluster0.ayvcw.mongodb.net/Cluster0?retryWrites=true&w=majority`,
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

app.use(function(req, res, next){
  res.status(404);

  // Respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // Respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // Default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;