import express, { Router } from "express";
import {
  disableUser,
  enableUser,
  getEmployees,
  getUser,
  getUsers,
  insertUser,
  updateUser,
} from "../controllers/userController";
import {
  isHasAdminRight,
  isHasManagerRight,
  protectedRoute,
} from "../middleware/authMiddleware";

const router: Router = express.Router();
router.get("/employees", protectedRoute, isHasManagerRight, getEmployees);
router.get("/", protectedRoute, isHasAdminRight, getUsers);
router.get("/:userId", protectedRoute, getUser);
router.post("/", insertUser);
router.put("/:userId", updateUser);
router.get("/disable/:userId", protectedRoute, isHasManagerRight, disableUser);
router.get("/enable/:userId", protectedRoute, isHasManagerRight, enableUser);

export default router;
