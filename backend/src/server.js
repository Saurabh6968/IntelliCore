const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const envFile = fs.existsSync(path.join(__dirname, "..", ".env"))
  ? path.join(__dirname, "..", ".env")
  : path.join(__dirname, "..", ".ENV");
dotenv.config({ path: envFile });

const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`IntelliCore Backend running on port ${PORT}`);
});