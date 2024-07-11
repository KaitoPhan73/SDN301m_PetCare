import express, { Router } from "express";
import { ServiceController } from "../controllers/serviceController";
import {isHasAdminRight, protectedRoute} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/", ServiceController.getAllService);
router.get("/:id", ServiceController.getServiceById);
router.put("/:id",protectedRoute,isHasAdminRight, ServiceController.updateServiceById);
router.post("/",protectedRoute,isHasAdminRight, ServiceController.insertService);
router.delete("/:id",protectedRoute,isHasAdminRight, ServiceController.deleteService);

export default router;
