import { Request, Response } from "express";
import * as roomService from "../services/roomService";
import { TPagination } from "../types/pagination";
import { IRoom } from "../types/room";
import {getRoomsList} from "../services/roomService";

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
    };
    const result: TPagination<IRoom> = await roomService.getAllRooms(options);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomId = req.params.roomId;
    const room = await roomService.getRoomById(roomId);
    if (room !== null) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.error("Error fetching Room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const insertRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roomData = req.body;
    const newRoom = await roomService.createRoom(roomData);
    console.log("newRoom:", newRoom);

    res
      .status(201)
      .json({ room: newRoom, message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating Room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roomId = req.params.roomId.trim();
    await roomService.deleteRoomById(roomId);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roomID = req.params.roomId;
    const updateData = { ...req.body };
    const updatedRoom = await roomService.updateRoomById(roomID, updateData);
    if (updatedRoom !== null) {
      res
        .status(200)
        .json({ room: updatedRoom, message: "Room updated successfully" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoomList = async (req: Request, res: Response) => {
  try {
    const rooms = await getRoomsList();
    return res.status(200).json(rooms);
  }catch (error){
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Server error" });
  }
}