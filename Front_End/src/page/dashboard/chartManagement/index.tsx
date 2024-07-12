"use client"

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { TBookingResponse } from '@/schemaValidations/booking.schema';

interface ChartPageProps {
  bookings: TBookingResponse[]; // Define props interface
}

const ChartPage: React.FC<ChartPageProps> = ({ bookings }) => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const generateChartData = () => {
      if (!bookings) return;

      const chartLabels: string[] = [];
      const chartDataPoints: number[] = [];

      bookings.forEach((booking) => {
        const createDate = format(new Date(booking.createdAt), 'yyyy-MM-dd');
        const existingIndex = chartLabels.findIndex((label) => label === createDate);

        if (existingIndex !== -1) {
          chartDataPoints[existingIndex] += booking.totalPrice;
        } else {
          chartLabels.push(createDate);
          chartDataPoints.push(booking.totalPrice);
        }
      });

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Total Price',
            data: chartDataPoints,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
    };

    generateChartData();
  }, [bookings]);

  if (!bookings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Booking Total Price Line Chart</h2>
      <div style={{ height: '400px', width: '600px', margin: 'auto' }}>
        <Line data={chartData} options={{}} />
      </div>
    </div>
  );
};

export default ChartPage;
