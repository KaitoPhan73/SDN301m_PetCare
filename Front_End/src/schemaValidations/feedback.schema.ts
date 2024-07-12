import { z } from "zod";

const FeedbackSchema = z.object({
  content: z.string(),
  createDate: z.date(),
  modifiedDate: z.date(),
  bookingId: z.string(), 
  userId: z.string(), 
  status: z.boolean(),
});

export type TFeedback = z.infer<typeof FeedbackSchema>;
