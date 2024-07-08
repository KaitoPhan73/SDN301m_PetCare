import { httpPetCare } from "@/lib/http";
import { TFeedback } from "@/schemaValidations/feedback.schema";
// import { TUser } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";
import { get } from "lodash";

const FeedBacksApi = {
  getFeedbacks: (params?: any) => {
    return httpPetCare.get<TTableResponse<TFeedback>>("/feedback", {
      params,
    });
  },
  getFeedbackById: (id: string) => {
    return httpPetCare.get<TFeedback>(`/feedback`);
  },
};

export default FeedBacksApi;
