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
import VisibilityIcon from "@mui/icons-material/Visibility";
type Props = {
  feedback: any;
};
export function DialogShowFeedBack({ feedback }: Props) {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<TFeedback>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      ...feedback,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full w-full max-w-[280px] py-2 text-center justify-center items-center bg-black font-semibold text-lg text-white flex transition-all duration-500 hover:bg-white hover:text-black">
          <span className="px-2">
            <VisibilityIcon />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Your FeedBack</DialogTitle>
          <DialogDescription>Thank you</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormProvider {...form}>
            <InputField name="content" label="Your Feedback" disabled />
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
