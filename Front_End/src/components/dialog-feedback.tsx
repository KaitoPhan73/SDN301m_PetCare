import BookingDetailApi from "@/actions/booking-detail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "./form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFeedback, FeedbackSchema } from "@/schemaValidations/feedback.schema";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FeedBacksApi from "@/actions/feedbacks";
import { useState } from "react";
type Props = {
  _id: string;
};
export function DialogFeedBack({ _id }: Props) {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<TFeedback>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      content: "",
      bookingDetailId: _id,
      userId: user?._id,
      status: true,
    },
  });

  const onSubmit = async (values: TFeedback) => {
    try {
      const response = await FeedBacksApi.createFeedback(values);
      if (response.status === 201) {
        enqueueSnackbar("Thanks you send feedback", { variant: "success" });
        router.refresh();
      }
    } catch (error: any) {
      enqueueSnackbar(`Login failed `, { variant: "error" });
      form.reset();
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-black font-semibold text-lg text-white flex transition-all duration-500 hover:bg-white hover:text-black">
          <span className="px-2">Feedback</span>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>Write do you think ?</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
              noValidate
            >
              <InputField
                name="content"
                label="Write your feedback ..."
                fullWidth
              />

              {/* Grid item cho nút submit */}

              <Button
                type="submit"
                className="!mt-8 w-full bg-black text-white hover:bg-gray-200 hover:text-black transition duration-300"
              >
                Send
              </Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
