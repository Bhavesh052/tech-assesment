import express from "express";
import authMiddleware from './../middleware/auth.js';
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

/**
 * @openapi
 * /api/order/place:
 *   post:
 *     summary: Place a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               userId:
 *                type: string
 *                example: jcjkw13
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               amount:
 *                 type: number
 *                 example: 1500
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Colombo"
 *     responses:
 *       200:
 *         description: Stripe session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 session_url:
 *                   type: string
 */
orderRouter.post("/place", authMiddleware, placeOrder);

/**
 * @openapi
 * /api/order/verify:
 *   post:
 *     summary: Verify order payment
 *     tags:
 *       - Orders
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
 *               message:
 *                 type: string
 *                 example: Paid
 *               success:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Order payment verified or cancelled
 */
orderRouter.post("/verify", verifyOrder);
/**
 * @openapi
 * /api/order/userorders:
 *   post:
 *     summary: Get all orders for the logged-in user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68cba1bb719b9a68865dc8c2"
 *                       userId:
 *                         type: string
 *                         example: "68cb7c25cbaba97e1c93fca6"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "68c266c846979f603e677532"
 *                             name:
 *                               type: string
 *                               example: "Lasagna Rolls"
 *                             description:
 *                               type: string
 *                               example: "Food provides essential nutrients for overall health and well-being"
 *                             price:
 *                               type: number
 *                               example: 14
 *                             image:
 *                               type: string
 *                               example: "1757570760417food_5.png"
 *                             category:
 *                               type: string
 *                               example: "Rolls"
 *                             __v:
 *                               type: integer
 *                               example: 0
 *                             quantity:
 *                               type: integer
 *                               example: 1
 *                       amount:
 *                         type: number
 *                         example: 16
 *                       address:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: "John"
 *                           lastName:
 *                             type: string
 *                             example: "Jacob"
 *                           email:
 *                             type: string
 *                             format: email
 *                             example: "joavesh14@gmail.com"
 *                           street:
 *                             type: string
 *                             example: "6/2-A Jane street, inside street of Jay AMBE FARSAN, beside Adhya Shakti apartment, Jawaharchowk, maninagar 380008"
 *                           city:
 *                             type: string
 *                             example: "Ahmedabad"
 *                           state:
 *                             type: string
 *                             example: "GUJARAT"
 *                           zipcode:
 *                             type: string
 *                             example: "380008"
 *                           country:
 *                             type: string
 *                             example: "India"
 *                           phone:
 *                             type: string
 *                             example: "8938339267"
 *                       status:
 *                         type: string
 *                         example: "Food Processing"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-18T06:00:52.337Z"
 *                       payment:
 *                         type: boolean
 *                         example: true
 *                       __v:
 *                         type: integer
 *                         example: 0
 */
orderRouter.post("/userorders", authMiddleware, userOrders);

/**
 * @openapi
 * /api/order/status:
 *   post:
 *     summary: Update the status of an order
 *     tags:
 *       - Orders
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
 *               orderId:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Status Updated"
 *     responses:
 *       200:
 *         description: Order status updated
 */
orderRouter.post("/status", updateStatus);

export default orderRouter;
