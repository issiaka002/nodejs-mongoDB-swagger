// Importer le module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose'); 
// Récupérer la classe Schema de mongoose pour définir la structure des données
const Schema = mongoose.Schema; 

// Définir le schéma du modèle pour les données liées aux fruits
const fruitSchema = new Schema({
    "name": {
        "type": "string",
        "required": true
    },
    "stock": {
        "type": "string",
        "required": true
    }
},
{ timestamps: true } // Ajouter des champs de timestamp automatiques (createdAt et updatedAt) à chaque document
);

// Exporter le modèle mongoose associé au schéma
module.exports = mongoose.model("Fruit", fruitSchema);
