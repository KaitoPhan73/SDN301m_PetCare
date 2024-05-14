import express, { Request, Response, Router } from "express";
import { getUsers, getUser, insertUser } from "../controllers/UserController";

const router: Router = express.Router();

router.get("/users", getUsers);

router.get("/user/:userId", getUser);

router.post("/user", insertUser);

export default router;
