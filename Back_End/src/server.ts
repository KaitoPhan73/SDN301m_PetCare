
import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/api";
// import mongoose from "mongoose";
import connectDB from "./config/database";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect("mongodb://localhost:27017/PetCare",{
//     family: 4,
// }).then(() => {
//     console.log("connection successfully ");
// })


app.use(express.json());
app.use("/", router);

connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
