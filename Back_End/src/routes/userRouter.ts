import express, { Router } from "express";
import {
  disableUser,
  enableUser,
  getCustomer,
  getEmployees,
  getStaffs,
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
router.get("/customers", protectedRoute, getCustomer);
router.get("/staffs", protectedRoute, getStaffs);
router.post("/", insertUser);
router.put("/:userId", updateUser);
router.get("/disable/:userId", protectedRoute, isHasManagerRight, disableUser);
router.get("/enable/:userId", protectedRoute, isHasManagerRight, enableUser);

export default router;
