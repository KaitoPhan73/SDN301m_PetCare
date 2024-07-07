import paymentApi from "@/actions/payment";
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
import { RootState } from "@/redux/store";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
type Props = {
  total: number;
};
export function DialogPayment() {
  const carts = useSelector((state: RootState) => state.cart.products);

  const totalAmount = carts.reduce((total: any, item: any) => {
    return total + item.price;
  }, 0);
  console.log(totalAmount);
  const handleZaloPay = async () => {
    const amount = totalAmount;
    const response = await paymentApi.useZalo({ amount: amount });
    if (response.status === 200) {
      toast.success("Đã chuyển sang trang thanh toán");
      window.open(response.payload.order_url, "_blank");
    } else {
      toast.error("Lỗi xảy ra");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
          <span className="px-2">Continue to Payment</span>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
          <DialogDescription>Choose a payment method to pay.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button onClick={handleZaloPay}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYL2wXKpcPvnY6uQzVM0dmG4Mebk28lfkcPA&s"
              alt="ZaloPay"
              className="h-20 w-20 rounded-xl"
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
