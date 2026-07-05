const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes =
require("./routes/authRoutes");
const userRoutes =
require("./routes/userRoutes");
const productRoutes =
require("./routes/productRoutes");
const orderRoutes =
require("./routes/orderRoutes");

const {
    swaggerUi,
    swaggerDocument
} = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "..", "public", "imagenes")));

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerDocument
    )
);

app.use(
    "/api/auth",
    authRoutes
);
app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/products",
    productRoutes
)

app.use(
    "/api/orders",
    orderRoutes
);

module.exports = app;