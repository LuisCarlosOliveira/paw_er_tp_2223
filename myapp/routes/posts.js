var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var authController = require('../controllers/authController');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       properties:
 *         content:
 *           type: string
 *         attachments:
 *           type: array
 *           items:
 *             properties:
 *               name:
 *                 type: string
 *               file:
 *                 type: string
 *         creator:
 *           type: string
 *         thread:
 *           type: string
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Use to request all posts
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

router.get('/', postController.showAll);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     description: Use to request a specific post by ID
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
 *               $ref: '#/components/schemas/Post'
 */
router.get('/:id', postController.show);

/**
 * @swagger
 * /posts:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to create a post
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thread:    
 *                 type: string
 *               content:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *           example:
 *             thread: Thread ID    
 *             content: Post Content
 *             attachment: 
 *               $ref: 'path/to/your/file'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', 
    authController.verifyToken, 
    authController.checkBlocked, 
    authController.checkUserRole(['user', 'moderator', 'admin']),
    upload.single('attachment'), // Middleware do multer adicionado aqui
    postController.create
);


/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to edit a post
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *           example:
 *             content: Updated Post Content
 *             attachment: 
 *               $ref: 'path/to/your/file'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put('/:id', 
    authController.verifyToken, 
    authController.checkBlocked, 
    authController.checkUserRole(['user', 'moderator', 'admin']), 
    upload.single('attachment'), // multer middleware added here
    postController.edit
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     description: Use to delete a post
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
    postController.delete
);

/**
 * @swagger
 * /posts/{id}/upvote:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to upvote a post
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
 *               $ref: '#/components/schemas/Post'
 */
router.post('/:id/upvote',
    authController.verifyToken,
    authController.checkBlocked,
    authController.checkUserRole(['user', 'moderator', 'admin']),
    postController.upvotePost
);

/**
 * @swagger
 * /posts/{id}/downvote:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to downvote a post
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
 *               $ref: '#/components/schemas/Post'
 */
router.post('/:id/downvote',
    authController.verifyToken,
    authController.checkBlocked,
    authController.checkUserRole(['user', 'moderator', 'admin']),
    postController.downvotePost
);

module.exports = router;
