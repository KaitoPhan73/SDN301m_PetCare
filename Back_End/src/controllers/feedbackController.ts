// feedbackController.ts
import { Request, Response } from "express";
import * as feedbackService from "../services/feedbackService";
import { IFeedBack } from "../types/feedback";
import { TPagination } from "../types/pagination";

export const getFeedbacks = async (
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
    const feedbacks: TPagination<IFeedBack> =
      await feedbackService.getFeedbacks(options);

    
      res.status(200).json( feedbacks);

  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbackId = req.params.feedbackId;
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    if (feedback !== null) {
      res.status(200).json({ feedback, message: "Feedback found" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const insertFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, bookingId, userId, status } = req.body;
    const newFeedback: IFeedBack = await feedbackService.insertFeedback(
      content,
      bookingId,
      userId,
      status
    );
    res.status(201).json({
      feedback: newFeedback,
      message: "Feedback created successfully",
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbackId: string = req.params.feedbackId.trim();
    await feedbackService.deleteFeedbackById(feedbackId);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbackId: string = req.params.feedbackId;
    const updateData: Partial<IFeedBack> = req.body;
    const updatedFeedback: IFeedBack | null =
      await feedbackService.updateFeedbackById(feedbackId, updateData);
    if (updatedFeedback !== null) {
      res.status(200).json({
        feedback: updatedFeedback,
        message: "Feedback updated successfully",
      });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};
