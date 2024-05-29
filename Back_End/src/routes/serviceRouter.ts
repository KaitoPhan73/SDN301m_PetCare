import express, { Router } from "express";
import { ServiceController } from "../controllers/serviceController";

const router: Router = express.Router();

router.get("/get-all", ServiceController.getAllService );
router.get("/:id", ServiceController.getServiceById);
router.put("/:id", ServiceController.updateServiceById);
router.post("/", ServiceController.insertService);
router.delete("/:id", ServiceController.deleteService);

export default router;
