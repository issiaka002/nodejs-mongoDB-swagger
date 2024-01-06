// Importation des modules nécessaires
const express = require("express");
const mongoose = require('mongoose');
const foodRoute = require('./routes/fruit.routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');

// Création de l'application Express
const app = express();

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type,Authorization');
    next();
});

// Utilisation des routes définies dans le fichier 'fruit.routes.js' pour les appels liés aux fruits
app.use('/api/v1', foodRoute);

// Configuration de Swagger pour la documentation, accessible à l'URL '/api-doc'
const swaggerDocument = swaggerJsDoc(SwaggerOptions);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware pour la gestion des erreurs
app.use((error, req, res, next) => {
    console.error(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/sanoussi_db")
    .then(() => {
        // L'application écoute sur le port spécifié dans la variable d'environnement 'process.env.PORT' ou sur le port 8080 par défaut
        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Serveur en écoute sur le port ${port}`);
        });
    })
    .catch(err => {
        console.error(err);
    });
