
// ########################################################
// Exportation des dependencies neccessaire
// ########################################################
const express = require("express");
const fruitController = require('../web/fruit.controller');
const router = express.Router();
const { check } = require('express-validator');


// ########################################################
// Configuration de la documentation de l'api avec Swagger
// ########################################################

/**
 * @swagger
 * /api/v1/fruit:
 *  post:
 *    description: Permet d'ajouter un fruit a la BDD
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Ajouter un fruit
 *        description: Ajouter un fruit dans la DDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - stock
 *          properties:
 *            name:
 *              type: string
 *            stock:
 *              type: string
 *            
 *    responses:
 *      '200':
 *        description: Fruit ajouter avec success.
 */

router.post('/fruit',[
  check('name').trim().isLength({min:1}),
  check('stock').trim().isLength({min:1})
],fruitController.postfruit);




  /**
 * @swagger
 * /api/v1/fruit:
 *  get:
 *    description: Recuperer tous les fruits
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Success.
 */
router.get('/fruit', fruitController.getfruit);


  /**
 * @swagger
 * /api/v1/fruit/{id}:
 *  get:
 *    description: Recuperation d'un fruit grace a son ID
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *    responses:
 *      '200':
 *        description: Success.
 */
router.get('/fruit/:id', fruitController.getSingleFruit);




 /**
 * @swagger
 * /api/v1/fruit/{id}:
 *  put:
 *    description: Modification d'un fruit particulier
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update fruit
 *        description: Fruit a modifier dans la DDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - stock
 *          properties:
 *            name:
 *              type: string
 *            stock:
 *              type: string
 *            
 *    responses:
 *      '200':
 *        description: fruit item updated successfully.
 */
router.put('/fruit/:id', fruitController.updatefruit);





/**
 * @swagger
 * /api/v1/fruit/{id}:
 *  delete:
 *    description: Suppression d'un fruit dans la DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: supprimer le fruit.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: string
 *    responses:
 *      '200':
 *        description: Suppression effectuee evx success.
 */

router.delete('/fruit/:id', fruitController.deletefruit);




module.exports = router;  