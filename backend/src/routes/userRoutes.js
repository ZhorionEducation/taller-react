const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/", verifyToken, authorize("ADMIN"), controller.getAllUsers);
router.get("/:id", verifyToken, authorize("ADMIN"), controller.getUserById);

module.exports = router;