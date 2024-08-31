require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { setSetting } = require("./middleware/setting");
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected Successfully");
});

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes/routes");

app.use("/api", setSetting, routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
