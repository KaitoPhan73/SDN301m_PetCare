import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/api";
import connectDB from "./config/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use("/", router);

connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
