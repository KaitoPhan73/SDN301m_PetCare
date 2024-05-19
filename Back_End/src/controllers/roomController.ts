import { Request, Response } from "express";
import * as roomService from "../services/roomService";

export const getRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const rooms = await roomService.getAllRooms();
        if (rooms.length > 0) {
            res.status(200).json({ rooms, message: "Rooms found" });
        } else {
            res.status(404).json({ message: "Rooms not found" });
        }
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const insertRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const roomData = req.body;
        const newRoom = await roomService.createRoom(roomData);
        console.log("newRoom:", newRoom);

        res.status(201).json({ room: newRoom, message: "Room created successfully" });
    } catch (error) {
        console.error("Error creating Room:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const roomId = req.params.roomId.trim();
        await roomService.deleteRoomById(roomId);
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const roomID = req.params.roomId;
        const updateData = { ...req.body };
        const updatedRoom = await roomService.updateRoomById(roomID, updateData);
        if (updatedRoom !== null) {
            res.status(200).json({ room: updatedRoom, message: "Room updated successfully" });
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Server error" });
    }
};
