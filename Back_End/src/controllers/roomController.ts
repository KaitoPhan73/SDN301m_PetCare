import { IRoom } from "../types/room";
import { Request, Response } from "express";
import moment from 'moment-timezone';
import Room from "../models/Room";

export const getRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const rooms = await Room.find();
      console.log("cccccc", rooms);
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

export const insertRoom = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { roomNo, name, type, price, status} = req.body;
      const nowInVietnam = moment.tz(Date(), 'Asia/Ho_Chi_Minh');

      console.log("test", req.body);
 
      const newRoom: IRoom = new Room({
        roomNo,
        createDate: nowInVietnam,
        modifiedDate : nowInVietnam,
        name,
        type,
        price,
        status: status === 'approved' ? true : false
      });
      await newRoom.save();
  
      res
        .status(201)
        .json({ room: newRoom, message: "Room created successfully" });
    } catch (error) {
      console.error("Error creating Room:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const roomId = req.params.roomId.trim();
      const deletedRoom = await Room.findByIdAndDelete(roomId);
      if (deletedRoom !== null) {
        res.status(200).json({ message: "Room deleted successfully" });
      } else {
        res.status(404).json({ message: "Room not found" });
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const nowInVietnam = moment.tz(Date(), 'Asia/Ho_Chi_Minh');
        const roomID = req.params.roomId;
        const updateData = {
            ...(req.body.name && { name: req.body.name }),
            ...(req.body.type && { type: req.body.type }),
            ...(req.body.price && { price: req.body.price }),
            ...(req.body.status && { status: req.body.status === 'approved' }),
            modifiedDate: nowInVietnam, 
        };
        console.log("updatedata", updateData);
        const updatedRoom = await Room.findByIdAndUpdate(roomID, updateData, { new: true });
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
  
