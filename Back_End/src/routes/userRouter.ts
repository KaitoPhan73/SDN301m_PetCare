import express, { Router } from "express";
import {
  getUser,
  getUserById,
  getUsers,
  insertUser,
  updateUser,
} from "../controllers/UserController";

const router: Router = express.Router();
router.get("/", getUsers);

router.get("/:userId", getUser);

router.get("/:userId", getUserById);

router.post("/", insertUser);

router.put("/:userId", updateUser);

export default router;
