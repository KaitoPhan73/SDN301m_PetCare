import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/api";
import { getUsers } from "./controllers/UserController";
import configViewEngine from "./config/viewEngine";

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

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

app.use("/", router);

//test connection
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

