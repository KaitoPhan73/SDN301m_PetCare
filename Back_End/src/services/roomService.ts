import { Room } from "../models";
import { IRoom } from "../types/room";
import moment from "moment-timezone";

export const getAllRooms = async (): Promise<IRoom[]> => {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
};

export const createRoom = async (roomData: IRoom): Promise<IRoom> => {
  try {
    const nowInVietnam = moment.tz("Asia/Ho_Chi_Minh");
    const newRoom: IRoom = new Room({
      ...roomData,
      createDate: nowInVietnam.toDate(),
      modifiedDate: nowInVietnam.toDate(),
    });
    console.log("newRoom", newRoom);
    await newRoom.save();
    return newRoom;
  } catch (error) {
    throw new Error("Error creating Room: ");
  }
};

export const deleteRoomById = async (roomId: string): Promise<void> => {
  try {
    await Room.findByIdAndDelete(roomId);
  } catch (error) {
    throw new Error("Error deleting room");
  }
};

export const updateRoomById = async (
  roomId: string,
  updateData: Partial<IRoom>
): Promise<IRoom | null> => {
  try {
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");
    updateData.modifiedDate = nowInVietnam.toDate();
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData, {
      new: true,
    });
    return updatedRoom;
  } catch (error) {
    throw new Error("Error updating room");
  }
};
