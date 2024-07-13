import React from 'react';
import ChartPage from './index'; // Adjust path as needed
import { TBookingResponse } from '@/schemaValidations/booking.schema';

interface Props {
  data: TBookingResponse[];
}

const ParentComponent: React.FC<Props> = ({ data }) => {
  const chartData = data.map((booking) => ({
    createdAt: booking.createdAt,
    totalPrice: booking.totalPrice,
  }));

  return (
    <div>
      <ChartPage data={chartData} />
    </div>
  );
};

export default ParentComponent;
