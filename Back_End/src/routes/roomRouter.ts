import { isHasAdminRight, protectedRoute } from "../middleware/authMiddleware";
import { Router } from "express";
import {
  deleteRoom,
  getRoom,
  getRoomList,
  getRooms,
  insertRoom,
  updateRoom,
} from "../controllers/roomController";

const express = require("express");

const router: Router = express.Router();

router.get("/", getRooms);

router.get("/getAll", getRoomList);

router.get("/:roomId", getRoom);

router.post("/", protectedRoute, isHasAdminRight, insertRoom);

router.patch("/:roomId", protectedRoute, isHasAdminRight, updateRoom);

router.delete("/:roomId", protectedRoute, isHasAdminRight, deleteRoom);
export default router;
