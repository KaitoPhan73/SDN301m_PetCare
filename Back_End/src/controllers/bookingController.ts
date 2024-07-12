import { Request, Response } from "express";
import moment from "moment-timezone";
import * as bookingService from "../services/bookingService";
import { IBooking } from "../types/booking";
import Booking from "../models/Booking";
import { TPagination } from "../types/pagination";
import {getByStaffId, getByTime} from "../services/bookingService";
import {getRoomById} from "../services/roomService";
import {User} from "../models";

export const getBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const { page: _, limit: __, ...otherQueries } = req.query;

    const options = {
      page,
      limit,
      ...otherQueries,
    };
    const booking: TPagination<IBooking> = await bookingService.getBookings(
      options
    );

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await bookingService.getBookingById(bookingId);

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const insertBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingData: IBooking = req.body;
    const newBooking: IBooking = await bookingService.createBooking(
      bookingData
    );
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.bookingId.trim();
    await bookingService.deleteBookingById(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingID = req.params.bookingId;
    const updateData = { ...req.body };
    const updatedBooking = await bookingService.updateBookingById(
      bookingID,
      updateData
    );
    if (updatedBooking !== null) {
      res.status(200).json({
        room: updatedBooking,
        message: "Booking updated successfully",
      });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getBookingByTime = async (req:Request, res: Response) => {
  try {
    const { roomId} = req.body;
    console.log( req.body);
    const existingRoom = await getRoomById(roomId);
    if (!existingRoom) {
     return res.status(400).json()
    }
    // const start:Date = new Date(startDate);
    // const end:Date = new Date(endDate);
    console.log(existingRoom)
    const bookings = await getByTime( roomId)
    res.status(200).json(bookings)
  }catch(error){
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
}
export const getBookingByStaffId = async (req:Request, res: Response) => {
  try {
    const {staffId} = req.params;
    console.log(req.params);
   const staff = await User.findById(staffId);
   if (!staff){
     res.status(400).json({message: "User not found"});
   }
    const bookings = await getByStaffId(staffId)
    res.status(200).json(bookings)
  }catch(error){
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
}