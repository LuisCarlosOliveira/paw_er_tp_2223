var express = require('express');
var router = express.Router();
var threadController = require('../controllers/threadController');
var authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Thread:
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         creator:
 *           type: string
 */

/**
 * @swagger
 * /threads:
 *   get:
 *     description: Use to request all threads
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thread'
 */
router.get('/', threadController.showAll);

/**
 * @swagger
 * /threads/{id}:
 *   get:
 *     description: Use to request a specific thread by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 */
router.get('/:id', threadController.show);

/**
 * @swagger
 * /threads:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to create a thread
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Thread'
 *           example:
 *             title: Thread Title
 *             content: Thread Content
 *             course: Course ID
 *             subject: Subject ID
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 */

router.post('/', 
    authController.verifyToken, 
    authController.checkBlocked, 
    authController.checkUserRole(['user', 'moderator', 'admin']), 
    threadController.create
);

/**
 * @swagger
 * /threads/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     description: Use to delete a thread
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.delete('/:id', 
    authController.verifyToken, 
    authController.checkBlocked, 
    authController.checkUserRole(['user', 'moderator', 'admin']), 
    threadController.delete
);

/**
 * @swagger
 * /threads/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to hide a thread
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 */
router.put('/:id', 
    authController.verifyToken, 
    authController.checkBlocked, 
    authController.checkUserRole(['user', 'moderator', 'admin']), 
    threadController.hide
);

module.exports = router;
