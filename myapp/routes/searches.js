const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Search:
 *       properties:
 *         term:
 *           type: string
 *         type:
 *           type: string
 *         course:
 *           type: string
 *         subject:
 *           type: string
 *         page:
 *           type: integer
 *           description: Page number for results pagination
 *         limit:
 *           type: integer
 *           description: Number of results per page
 *     Thread:
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         creator:
 *           type: string
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *         hidden:
 *           type: boolean
 *         course:
 *           type: string
 *         subject:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /search/posts:
 *   get:
 *     description: Use to search for posts
 *     parameters:
 *       - name: term
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: course
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: subject
 *         in: query
 *         required: false
 *         schema:
 *           type: string
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
router.get('/posts', searchController.searchPosts);

/**
 * @swagger
 * /search/threads:
 *   get:
 *     description: Use to search for threads
 *     parameters:
 *       - name: term
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: course
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: subject
 *         in: query
 *         required: false
 *         schema:
 *           type: string
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
 *                 $ref: '#/components/schemas/Thread'
 */
router.get('/threads', searchController.searchThreads);

module.exports = router;

