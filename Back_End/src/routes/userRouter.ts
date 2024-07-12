import express, {Router} from "express";
import {
    disableUser,
    enableUser,
    getCustomer,
    getEmployees, getStaffs,
    getUser,
    getUsers,
    insertUser,
    updateUser,
} from "../controllers/userController";
import {isHasManagerRight, protectedRoute} from "../middleware/authMiddleware";

const router: Router = express.Router();
router.get("/employees", protectedRoute,getEmployees);
router.get("/customers",protectedRoute, getCustomer);
router.get("/staffs",protectedRoute, getStaffs);
router.get("/", protectedRoute,getUsers);
router.get("/:userId", getUser);
router.post("/", insertUser);
router.put("/:userId", updateUser);
router.get("/disable/:userId", protectedRoute, isHasManagerRight, disableUser)
router.get("/enable/:userId", protectedRoute, isHasManagerRight, enableUser)

export default router;
