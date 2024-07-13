import { z } from "zod";

export const FeedbackSchema = z.object({
  content: z.string(),
  createDate: z.date().optional(),
  modifiedDate: z.date().optional(),
  bookingDetailId: z.string(),
  userId: z.string(),
  status: z.boolean(),
});

export type TFeedback = z.infer<typeof FeedbackSchema>;
