import { Request, Response } from "express";
import * as bookingDetailService from "../services/bookingDetailService";
import { IBookingDetail } from "../types/bookingDetail";

export const insertBookingDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingData: IBookingDetail = req.body;
    const newBooking: IBookingDetail =
      await bookingDetailService.createBookingDetail(bookingData);
    res.status(201).json({
      booking: newBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};
