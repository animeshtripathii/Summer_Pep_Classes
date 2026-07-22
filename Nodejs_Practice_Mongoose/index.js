import "dotenv/config.js";
import express from "express";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running in on port ${PORT}`);
});