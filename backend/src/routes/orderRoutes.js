const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const verifyToken = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/", verifyToken, controller.createOrder);
router.get("/user", verifyToken, controller.getOrdersByUserId);
router.get("/", verifyToken, authorize("ADMIN"), controller.getAllOrders);
router.put("/:id/status", verifyToken, authorize("ADMIN"), controller.updateOrderStatus);
router.get("/:id", verifyToken, controller.getOrderById);

module.exports = router;