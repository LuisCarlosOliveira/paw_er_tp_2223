const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     description: Use to request all courses
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', courseController.showAll);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     description: Use to request a specific course by ID
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
 *               $ref: '#/components/schemas/Course'
 */
router.get('/:id', courseController.read);

/**
 * @swagger
 * /courses/name/{name}:
 *   get:
 *     description: Use to request a specific course by name
 *     parameters:
 *       - name: name
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
 *               $ref: '#/components/schemas/Course'
 */
router.get('/name/:name', courseController.showByName);

/**
 * @swagger
 * /courses/create:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to create a course
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.post('/create', authController.verifyToken, authController.checkUserRole(['admin']), courseController.create);

/**
 * @swagger
 * /courses/update/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to update a course
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.put('/update/:id', authController.verifyToken, authController.checkUserRole(['admin']), courseController.update);

/**
 * @swagger
 * /courses/delete/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     description: Use to delete a course
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
router.delete('/delete/:id', authController.verifyToken, authController.checkUserRole(['admin']), courseController.delete);

module.exports = router;
