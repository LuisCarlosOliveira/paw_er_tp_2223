var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/**
 * @swagger
 * components:
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
router.get('/', userController.showAll);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Use to request a user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the user to get
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get('/:id', userController.show);

/**
 * @swagger
 * /users:
 *  post:
 *    description: Use to create a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', userController.create);


/**
 * @swagger
 * /users/{id}:
 *  put:
 *    description: Use to update a user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the user to update
 *        required: true
 *        type: string
 *      - name: user
 *        in: body
 *        description: User data to update
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: Use to delete a user by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the user to delete
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', userController.delete);

/**
 * @swagger
 * /users/register:
 *  post:
 *    description: Use to register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: A successful response, returns JWT token
 *      '500':
 *        description: An error occurred
 */
router.post('/register', userController.create);

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: Use to login a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response, returns JWT token
 *      '401':
 *        description: Unauthorized, invalid username or password
 *      '500':
 *        description: An error occurred
 */
router.post('/login', userController.login);


module.exports = router;
