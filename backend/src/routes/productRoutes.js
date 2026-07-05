const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require("../controllers/productController");
const verifyToken = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "..", "..", "public", "imagenes"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const extension = path.extname(file.originalname).toLowerCase();
		cb(null, `${uniqueSuffix}${extension}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const allowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
		const extension = path.extname(file.originalname).toLowerCase();

		if (!allowedTypes.includes(extension)) {
			return cb(new Error("Solo se permiten imágenes JPG, PNG, WEBP o GIF"));
		}

		cb(null, true);
	},
});

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);

router.post("/", verifyToken, authorize("ADMIN"), upload.single("imageFile"), controller.createProduct);
router.put("/:id", verifyToken, authorize("ADMIN"), upload.single("imageFile"), controller.updateProduct);
router.delete("/:id", verifyToken, authorize("ADMIN"), controller.deleteProduct);

module.exports = router;
