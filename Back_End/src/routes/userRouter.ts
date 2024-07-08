import express, {Router} from "express";
import {
    disableUser,
    enableUser,
    getEmployees,
    getUser,
    getUsers,
    insertUser,
    updateUser,
} from "../controllers/userController";

const router: Router = express.Router();
router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", insertUser);
router.put("/:userId", updateUser);
router.get("/employees", getEmployees);
router.get("/disable/:userId", disableUser)
router.get("/enable/:userId", enableUser)

export default router;
