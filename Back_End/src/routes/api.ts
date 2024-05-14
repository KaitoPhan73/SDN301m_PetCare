import express, { Request, Response, Router } from "express";
import { getUsers, getUser } from "../controllers/UserController";

const router: Router = express.Router();

router.get("/users", getUsers);

router.get("/user/:userId", (req: Request, res: Response) => {
  getUser(req, res);
});

export default router;
