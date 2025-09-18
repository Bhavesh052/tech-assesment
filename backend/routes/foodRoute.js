import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @openapi
 * /api/food/add:
 *   post:
 *     summary: Add a new food item
 *     tags:
 *       - Food
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza Margherita
 *               description:
 *                 type: string
 *                 example: Classic pizza with tomato, mozzarella, and basil.
 *               price:
 *                 type: number
 *                 example: 12.5
 *               category:
 *                 type: string
 *                 example: Italian
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Food item successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Food Added
 */
foodRouter.post('/add', upload.single('image'), addFood);

/**
 * @openapi
 * /api/food/list:
 *   get:
 *     summary: Get a list of all food items
 *     tags:
 *       - Food
 *     responses:
 *       200:
 *         description: List of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       image:
 *                         type: string
 */
foodRouter.get('/list', listFood);

/**
 * @openapi
 * /api/food/remove:
 *   post:
 *     summary: Remove a food item
 *     tags:
 *       - Food
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64cbd92b8c29f823b7a1d123
 *     responses:
 *       200:
 *         description: Food item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Food Removed
 */
foodRouter.post('/remove', removeFood);

export default foodRouter;
