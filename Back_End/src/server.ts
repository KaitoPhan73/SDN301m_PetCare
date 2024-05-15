import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/api";
// import connectDB from "./config/database";
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

mongoose.connect("mongodb://localhost:27017/PetCare",{
    family: 4,
}).then(() => {
    console.log("connection successfully ");
})


app.use(express.json());
app.use("/", router);

// connectDB();

//test connection
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

