import { Separator } from "@/components/ui/separator";
import HistoryList from "./history-list";
import { cookies } from "next/headers";
import BookingApi from "@/actions/booking";

async function page(props: any) {
  const cookieStore = cookies();
  const storeUser = cookieStore.get("user")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;
  const userId = JSON.parse(storeUser!)._id;
  const params = {
    page: props.searchParams.page || 1,
    limit: props.searchParams.pageSize || 6,
    userId: userId,
  };
  const response = await BookingApi.getBookings(params, accessToken);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">History Booking</h3>
      </div>
      <Separator />
      <HistoryList data={response.payload} params={params} />
    </div>
  );
}

export default page;
