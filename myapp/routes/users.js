var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:            
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *          enum: [user, moderator, admin]
 *        isBlocked:
 *          type: boolean
 *        deletedPosts:
 *          type: number
 *        deletedThreads:
 *          type: number
 */

/**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - BearerAuth: [] 
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', authController.verifyToken, authController.checkBlocked, userController.showAll);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *      - BearerAuth: [] 
 *    description: Use to request a specific user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/:id', authController.verifyToken, authController.checkBlocked, userController.show);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    security:
 *      - BearerAuth: [] 
 *    description: Use to update a specific user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.put('/:id', authController.verifyToken, authController.checkBlocked, userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *      - BearerAuth: [] 
 *    description: Use to delete a specific user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', authController.verifyToken, authController.checkBlocked, userController.delete);

/**
 * @swagger
 * /users/register:
 *  post:
 *    description: Use to register a new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: Use to login a user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /users/username/{username}:
 *  get:
 *    security:
 *      - BearerAuth: [] 
 *    description: Use to request a specific user by username
 *    parameters:
 *      - name: username
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/username/:username', authController.verifyToken, authController.checkBlocked, userController.showByUsername);

module.exports = router;
