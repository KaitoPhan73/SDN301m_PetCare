import React from "react";
import HistoryDetail from "./detail-history";
import BookingApi from "@/actions/booking";
import { Separator } from "@/components/ui/separator";

export default async function Detail(props: any) {
  const { slug } = props.params;
  const response = await BookingApi.getBooking(slug);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">History Detail</h3>
      </div>
      <Separator />
      <HistoryDetail dataSource={response.payload.bookingDetails} />
    </div>
  );
}
