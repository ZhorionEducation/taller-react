require("dotenv").config();

const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log(`server corriendo en el puerto ${process.env.PORT}`);
});