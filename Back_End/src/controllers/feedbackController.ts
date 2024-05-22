import { IFeedBack } from "./../types/feedback";
import { Request, Response } from "express";
import moment from 'moment-timezone';
import { Feedback } from '../models';

export const getFeedBack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbacks = await Feedback.find();
    console.log("cccccc", feedbacks);
    if (feedbacks.length > 0) {
      res.status(200).json({ feedbacks, message: "FeedBacks found" });
    } else {
      res.status(404).json({ message: "FeedBacks not found" });
    }
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const insertFeedBack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, bookingId, userId, status } = req.body;
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");

    console.log("test", req.body);

    const newFeedBack: IFeedBack = new Feedback({
      content,
      createDate: nowInVietnam,
      modifiedDate: nowInVietnam,
      bookingId,
      userId,
      status: status === "approved" ? true : false,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newFeedBack.save();

    res.status(201).json({
      feedback: newFeedBack,
      message: "FeedBack created successfully",
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFeedBack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbackID = req.params.feedbackId.trim();
    const deletedFeedBack = await Feedback.findByIdAndDelete(feedbackID);
    if (deletedFeedBack !== null) {
      res.status(200).json({ message: "FeedBack deleted successfully" });
    } else {
      res.status(404).json({ message: "FeedBack not found" });
    }
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFeedBack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");
    const feedbackID = req.params.feedbackId;
    const updateData = {
      ...(req.body.content && { content: req.body.content }),
      ...(req.body.status && { status: req.body.status === "approved" }),
      modifiedDate: nowInVietnam,
    };
    const updatedFeedBack = await Feedback.findByIdAndUpdate(
      feedbackID,
      updateData,
      { new: true }
    );
    if (updatedFeedBack !== null) {
      res.status(200).json({
        feedback: updatedFeedBack,
        message: "FeedBack updated successfully",
      });
    } else {
      res.status(404).json({ message: "FeedBack not found" });
    }
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};
