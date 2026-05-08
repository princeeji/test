require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes.js");
const authRoutes = require("./routes/auth.routes.js");
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", todoRoutes);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing from environment variables");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing from environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on the port ${PORT}`);
      console.log("mongo connected");
    });
  })
  .catch((err) => {
    console.error("There was an error connecting to MongoDB", err);
  });
