import express, { Router } from "express";
import { PackageController } from "../controllers/packageController";

const router: Router = express.Router();

router.get("/", PackageController.getAllPackage);
router.get("/:id", PackageController.getPackageById);
router.put("/:id", PackageController.updatePackageById);
router.post("/", PackageController.insertPackage);
router.delete("/:id", PackageController.deletePackage);

export default router;
