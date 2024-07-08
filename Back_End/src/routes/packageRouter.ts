import express, {Router} from "express";
import {PackageController} from "../controllers/packageController";
import {isHasAdminRight, protectedRoute} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", PackageController.getAllPackage);
router.get("/:id", PackageController.getPackageById);
router.put("/:id", protectedRoute, isHasAdminRight, PackageController.updatePackageById);
router.post("/", protectedRoute, isHasAdminRight, PackageController.insertPackage);
router.delete("/:id", protectedRoute, isHasAdminRight, PackageController.deletePackage);

export default router;
