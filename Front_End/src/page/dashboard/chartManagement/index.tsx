"use client"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";

interface ChartData {
  createdAt: string;
  totalPrice: number;
}

interface Props {
  data: ChartData[]; // Adjust type according to your data structure
}

const ChartPage: React.FC<Props> = ({ data }) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="createdAt" /> {/* Use createdAt as dataKey */}
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalPrice" stroke="#8884d8" /> {/* Display totalPrice */}
    </LineChart>
  );
};

export default ChartPage;
