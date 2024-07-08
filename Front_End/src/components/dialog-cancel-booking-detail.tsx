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
type Props = {
  _id: string;
};
export function DialogBookingDetailCancel({ _id }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleCancel = async () => {
    const response = await BookingDetailApi.updateBookingDetail(_id, {
      status: "Cancelled",
    });
    if (response.status === 200) {
      enqueueSnackbar("Cancel successfully", { variant: "success" });
      router.push(`/profile/history/${_id}`);
      router.refresh();
    } else {
      enqueueSnackbar("Cancel failed", { variant: "error" });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-red-500 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
          <span className="px-2">Cancel</span>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Alert</DialogTitle>
          <DialogDescription>Do you want to cancel?</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={handleCancel}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
