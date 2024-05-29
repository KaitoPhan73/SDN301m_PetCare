import { Request, Response } from "express";
import moment from "moment-timezone";
import * as bookingService from "../services/bookingService";
import { IBooking } from "../types/booking";
import Booking from "../models/Booking";

export const getBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const booking = await bookingService.getAllBookings();
    console.log("cccccc", booking);
    if (booking.length > 0) {
      res.status(200).json({ booking, message: "Booking found" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const insertBooking = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const bookingData: IBooking = req.body;
      console.log("bookingData", bookingData); 
      const newBooking: IBooking = await bookingService.createBooking(bookingData);
      console.log("bookingData", newBooking); 
      res.status(201).json({
        booking: newBooking,
        message: "Booking created successfully",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookingId = req.params.bookingId.trim();
        await bookingService.deleteBookingById(bookingId);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
      const bookingID = req.params.bookingId;
      const updateData = { ...req.body };
      const updatedBooking = await bookingService.updateBookingById(bookingID, updateData);
      if (updatedBooking !== null) {
          res.status(200).json({ room: updatedBooking, message: "Booking updated successfully" });
      } else {
          res.status(404).json({ message: "Booking not found" });
      }
  } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ message: "Server error" });
  }
};
  