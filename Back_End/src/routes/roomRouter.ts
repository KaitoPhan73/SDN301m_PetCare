const express = require("express");
import { Router } from "express";
import {
  deleteRoom,
  getRoom,
  getRooms,
  insertRoom,
  updateRoom,
} from "../controllers/roomController";

const router: Router = express.Router();

router.get("/", getRooms);

router.get("/:roomId", getRoom);

router.post("/", insertRoom);

router.patch("/:roomId", updateRoom);

router.delete("/:roomId", deleteRoom);
export default router;
