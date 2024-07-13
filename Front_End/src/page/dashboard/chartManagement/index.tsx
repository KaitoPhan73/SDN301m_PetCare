"use client";
import { formatCustomDate } from "@/lib/formatDate";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"; // Import MUI components for styling

interface ChartData {
  createdAt: string;
  totalPrice: number;
}

interface Props {
  data: ChartData[]; // Adjust type according to your data structure
}

const ChartPage: React.FC<Props> = ({ data }) => {
  // Calculate total price per day
  const totalPricePerDay: { [key: string]: number } = {};
  data.forEach((entry) => {
    if (totalPricePerDay[entry.createdAt]) {
      totalPricePerDay[entry.createdAt] += entry.totalPrice;
    } else {
      totalPricePerDay[entry.createdAt] = entry.totalPrice;
    }
  });

  // Create data array for chart
  const chartData: ChartData[] = Object.keys(totalPricePerDay).map((date) => ({
    createdAt: date,
    totalPrice: totalPricePerDay[date],
  }));

  // Calculate total price for all days
  const totalAllPrice = Object.values(totalPricePerDay).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // Prepare data for listing total prices per day
  const totalPricesList: { date: string; totalPrice: number }[] = Object.keys(
    totalPricePerDay
  ).map((date) => ({
    date,
    totalPrice: totalPricePerDay[date],
  }));

  return (
    <Box className="container mx-auto p-4">
      <Typography variant="h4" className="mb-4">
        Sales Chart
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="createdAt"
                tickFormatter={(value) => formatCustomDate(value as string)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <Typography variant="h5" className="mb-2">
            Total Sales Summary
          </Typography>
          <List>
            {totalPricesList.map((item) => (
              <ListItem key={item.date}>
                <ListItemText
                  primary={`${formatCustomDate(item.date)}:`}
                  secondary={`₫${item.totalPrice.toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" className="mt-4 font-bold">
            Total Sales: ₫{totalAllPrice.toLocaleString()}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default ChartPage;
