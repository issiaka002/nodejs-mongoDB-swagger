// Importer le module mongoose pour interagir avec MongoDB
const mongoose = require('mongoose'); 
// Importer la fonction validationResult de express-validator pour valider les données d'une requête
const { validationResult } = require('express-validator'); 
// Importer le modèle (_fruitEntity) pour interagir avec la collection de fruits dans la base de données MongoDB
const _fruitEntity = require('../entities/fruit'); 

// Récupérer un seul fruit par son ID
exports.getSingleFruit = (req, res, next) => {
    const fruitId = req.params.id;

    // Utiliser la méthode findById pour trouver le fruit par son ID
    _fruitEntity.findById(fruitId)
        .then(fruit => {
            if (!fruit) {
                // Si le fruit n'est pas trouvé, renvoyer une erreur 404
                const error = new Error("Fruit non trouvé");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Fruit récupéré avec succès",
                fruit: fruit
            });
        })
        .catch(err => {
            console.log(err);

            if (!err.statusCode) {
                // Gérer les autres erreurs avec le statut 500 par défaut
                err.statusCode = 500;
            }
            next(err);
        });
};



// Récupérer une liste paginée de fruits
exports.getfruit = (req, res, next) => {
    // Récupérer la page courante à partir des paramètres de requête ou utiliser 1 par défaut
    const _pageCurrent = req.query.page || 1;
    // Nombre d'éléments à afficher par page
    const nbrElementParPage = 15;

    return _fruitEntity.find()
        .countDocuments()
        .then(count => {
            console.log({ count });
            // Récupérer les fruits en sautant les éléments précédents et en limitant le nombre d'éléments par page
            _fruitEntity.find()
                .skip((_pageCurrent - 1) * nbrElementParPage)
                .limit(nbrElementParPage)
                .then(fruits => {
                    res.status(200).json({
                        message: "Succès",
                        fruits: fruits,
                    });
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



// Ajouter un nouveau fruit
exports.postfruit = (req, res, next) => {
    // Valider les erreurs de la requête
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    // Récupérer les données du corps de la requête
    const name = req.body.name;
    const stock = req.body.stock;

    // Créer une nouvelle instance de _fruitEntity
    const fruit = new _fruitEntity({
        name: name,
        stock: stock,
    });

    // Sauvegarder le fruit dans la base de données
    fruit.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Fruit ajouté avec succès",
            });
        })
        .catch(err => {
            console.log(err);
            // Gérer les erreurs de sauvegarde
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};



// Supprimer un fruit par son ID
exports.deletefruit = (req, res, next) => {
    const id = req.params.id;

    // Trouver et supprimer le fruit par son ID
    _fruitEntity.findByIdAndRemove(id, function (err) {
        if (err) return next(err);
        res.status(200).json({
            message: "Fruit supprimé avec succès",
        });
    });
};



// Mettre à jour un fruit par son ID
exports.updatefruit = (req, res, next) => {
    // Mettre à jour le fruit par son ID avec les nouvelles données du corps de la requête
    _fruitEntity.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    )
    .then(fruit => {
        if (!fruit) {
            // Si le fruit n'est pas trouvé, renvoyer une erreur 404
            const error = new Error("Fruit non trouvé");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Fruit modifié avec succès",
            fruit: fruit
        });
    })
    .catch(err => {
        console.log(err);

        if (!err.statusCode) {
            // Gérer les autres erreurs avec le statut 500 par défaut
            err.statusCode = 500;
        }
        next(err);
    });
};
