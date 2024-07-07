"use client";
import React from "react";
import { Grid } from "@mui/material";
import BookingDetail from "./Detail";

interface BookingDetailsProps {
  fields: any[]; // Assuming this matches your fields structure
  handleRemoveById: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  handleRemoveById,
  fields,
}) => {
  return (
    <Grid container spacing={2}>
      {fields.map((item, index) => (
        <BookingDetail
          key={item.id}
          item={item}
          index={index}
          handleRemoveById={handleRemoveById}
        />
      ))}
    </Grid>
  );
};

export default BookingDetails;
