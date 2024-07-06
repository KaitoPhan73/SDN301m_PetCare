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
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking Detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBookingDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingDetailId: string = req.params.id;
    const updateData: Partial<IBookingDetail> = req.body;

    const updatedBookingDetail: IBookingDetail | null =
      await bookingDetailService.updateOne(bookingDetailId, updateData);

    if (!updatedBookingDetail) {
      res.status(404).json({
        message: `Booking Detail with id ${bookingDetailId} not found.`,
      });
      return;
    }

    res.status(200).json(updatedBookingDetail);
  } catch (error) {
    console.error("Error updating booking Detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};
