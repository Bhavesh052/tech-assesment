import express from 'express';
import {
  addToCart,
  removeFromCart,
  getCart
} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

/**
 * @openapi
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - success
 *               - message
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: Added to cart
 *     responses:
 *       200:
 *         description: Added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
cartRouter.post('/add', authMiddleware, addToCart);

/**
 * @openapi
 * /api/cart/remove:
 *   post:
 *     summary: Remove an item from the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - success
 *               - message
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: Removed from cart
 *     responses:
 *       200:
 *         description: Item successfully removed from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
cartRouter.post('/remove', authMiddleware, removeFromCart);
/**
 * @openapi
 * /api/cart/get:
 *   post:
 *     summary: Get the current user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartData:
 *                 type: object
 *                 additionalProperties:
 *                   type: integer
 *                 example: {"64cbd92b8c29f823b7a1d999": 10}
 *               success:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cart data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cartData:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     "68c2669846979f603e677530": 0
 *                     "68c266c846979f603e677532": 104
 */
cartRouter.post('/get', authMiddleware, getCart);



export default cartRouter;
