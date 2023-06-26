const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       properties:
 *         name:
 *           type: string
 *         course:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       properties:
 *         name:
 *           type: string
 *         courses:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of course IDs
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     description: Use to request all subjects
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 */
router.get('/', subjectController.showAll);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     description: Use to request a specific subject by ID
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
 *               $ref: '#/components/schemas/Subject'
 */
router.get('/:id', subjectController.read);

/**
 * @swagger
 * /subjects/course/{courseId}:
 *   get:
 *     description: Use to request all subjects of a specific course
 *     parameters:
 *       - name: courseId
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 */
router.get('/course/:courseId', subjectController.showByCourse);

/**
 * @swagger
 * /subjects/create:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to create a subject
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *           example:
 *             name: Subject Name
 *             courses: [Course ID 1, Course ID 2]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
router.post('/create', authController.verifyToken, authController.checkUserRole(['admin']), subjectController.create);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to update a subject
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
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
router.put('/:id', authController.verifyToken, authController.checkUserRole(['admin']), subjectController.update);

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     description: Use to delete a subject
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
router.delete('/:id', authController.verifyToken, authController.checkUserRole(['admin']), subjectController.delete);

/**
 * @swagger
 * /courses/{courseId}/subjects/{subjectId}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to add a subject to a course
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: subjectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/courses/:courseId/subjects/:subjectId', authController.verifyToken, authController.checkUserRole(['admin']), subjectController.addSubjectToCourse);

module.exports = router;

