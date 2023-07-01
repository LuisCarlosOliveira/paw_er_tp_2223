var express = require("express");
var router = express.Router();
var threadController = require("../controllers/threadController");
var authController = require("../controllers/authController");
var postController = require("../controllers/postController");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

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
 *     Post:
 *       properties:
 *         postId:
 *           type: string
 *         content:
 *           type: string
 *         threadId:
 *           type: string
 *         creator:
 *           type: string
 */


/**
 * @swagger
 * /threads:
 *   get:
 *     description: Use to request all threads
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
 *                 $ref: '#/components/schemas/Thread'
 */
router.get("/", threadController.showAll);

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
router.get("/:id", threadController.show);

/**
 * @swagger
 * /threads:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     description: Use to create a thread
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               course:
 *                 type: string
 *               subject:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *           example:
 *             title: Thread Title
 *             content: Thread Content
 *             course: Course ID
 *             subject: Subject ID
 *             attachment:
 *               $ref: 'path/to/your/file'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 */
router.post(
  "/",
  authController.verifyToken,
  authController.checkBlocked,
  authController.checkUserRole(["user", "moderator", "admin"]),
  upload.single("attachment"), // middleware do multer adicionado aqui
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
router.delete(
  "/:id",
  authController.verifyToken,
  authController.checkBlocked,
  authController.checkUserRole(["user", "moderator", "admin"]),
  threadController.delete
);

/**
 * @swagger
 * /threads/{id}/hide:
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
router.post(
  "/:id/hide",
  authController.verifyToken,
  authController.checkBlocked,
  authController.checkUserRole(["user", "moderator", "admin"]),
  threadController.hide
);

/**
 * @swagger
 * /threads/{id}/edit:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     description: Use to edit a thread
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               attachment:
 *                 type: string
 *                 format: binary
 *           example:
 *             title: Updated Title
 *             content: Updated Content
 *             attachment:
 *               $ref: 'path/to/your/file'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thread'
 */
router.put(
  "/:id/edit",
  authController.verifyToken,
  authController.checkBlocked,
  authController.checkUserRole(["user", "moderator", "admin"]),
  upload.single("attachment"), // multer middleware added here
  threadController.edit
);

router.get("/subjects/:subjectId", threadController.showBySubject);

/**
 * @swagger
 * /threads/{id}/posts:
 *   get:
 *     description: Use to request all posts from a specific thread by ID
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'  
 */
router.get("/:id/posts", postController.showByThread);


module.exports = router;
