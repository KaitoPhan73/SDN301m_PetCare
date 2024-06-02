import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./src/routes/index";
import connectDB from "./src/config/database";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", router);

connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
