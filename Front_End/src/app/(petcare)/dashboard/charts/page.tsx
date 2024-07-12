import BookingApi from "@/actions/booking";
import ChartPage from "@/page/dashboard/chartManagement";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

interface ChartProps {
  searchParams: {
    page?: number;
    limit?: number;
  };
}

const Chart: React.FC<ChartProps> = ({ searchParams }) => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const params = {
        page: searchParams.page ? +searchParams.page : 1,
        limit: searchParams.limit ? +searchParams.limit : 10,
      };

      const cookieStore = cookies();
      const accessToken = cookieStore.get("accessToken")?.value;

      try {
        const response = await BookingApi.getBookings(params);
        if (response) {
          setBookings(response.payload.items); // Set bookings state with fetched data
        } else {
          console.error("Failed to fetch bookings:", response);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [searchParams]);

  return (
    <div>
      <ChartPage bookings={bookings} /> {/* Pass bookings data to ChartPage */}
    </div>
  );
};

export default Chart;
