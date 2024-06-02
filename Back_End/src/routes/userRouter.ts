import express, { Router } from "express";
import {
  getUser,
  getUsers,
  insertUser,
  updateUser,
} from "../controllers/userController";

const router: Router = express.Router();
router.get("/get-all", getUsers);

router.get("/:userId", getUser);

router.post("/", insertUser);

router.put("/:userId", updateUser);

export default router;
