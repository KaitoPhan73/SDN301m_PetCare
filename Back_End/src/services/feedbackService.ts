// feedbackService.ts
import { IFeedBack } from "../types/feedback";
import moment from "moment-timezone";
import { Feedback } from "../models";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

export const getFeedbacks = async (
  options: any
): Promise<TPagination<IFeedBack>> => {
  try {
    return paginate(Feedback, options);
  } catch (error) {
    throw new Error("Error fetching feedbacks");
  }
};

export const getFeedbackById = async (
  feedbackId: string
): Promise<IFeedBack | null> => {
  try {
    const feedback = await Feedback.findById(feedbackId).exec();

    if (!feedback) {
      return null;
    }

    return feedback;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
};

export const insertFeedback = async (
  content: string,
  bookingId: string,
  userId: string,
  status: string
): Promise<IFeedBack> => {
  try {
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");

    const newFeedback: IFeedBack = new Feedback({
      content,
      createDate: nowInVietnam,
      modifiedDate: nowInVietnam,
      bookingId,
      userId,
      status: status === "approved" ? true : false,
    });

    await newFeedback.save();

    return newFeedback;
  } catch (error) {
    throw new Error("Error creating feedback");
  }
};

export const deleteFeedbackById = async (feedbackId: string): Promise<void> => {
  try {
    await Feedback.findByIdAndDelete(feedbackId);
  } catch (error) {
    throw new Error("Error deleting feedback");
  }
};

export const updateFeedbackById = async (
  feedbackId: string,
  updateData: Partial<IFeedBack>
): Promise<IFeedBack | null> => {
  try {
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");
    updateData.modifiedDate = nowInVietnam.toDate();
    return await Feedback.findByIdAndUpdate(feedbackId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Error updating feedback");
  }
};
