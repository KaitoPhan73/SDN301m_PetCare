import express, { Express, Request, Response } from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import router from "./routes/api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use("/", router);

connectDB();
//test connection
app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
