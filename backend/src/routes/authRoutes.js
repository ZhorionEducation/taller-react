 const express = require("express");
 const router = express.Router();
 const controller = require("../controllers/authController");
 const verifyToken = require("../middlewares/authMiddleware");
 const authorize = require("../middlewares/roleMiddleware");

 router.post("/register", controller.register);
 router.post("/login", controller.login);
 router.post(
    "/register-admin",
    verifyToken,
    authorize("ADMIN"),
    controller.registerAdmin
);

module.exports = router;
