import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

mongoose
  .connect("mongodb://localhost:27017/StudentTest")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(express.json());
app.use("/", router);

//test connection
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

