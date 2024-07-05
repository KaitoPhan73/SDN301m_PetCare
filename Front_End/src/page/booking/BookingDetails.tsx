"use client";
import React from "react";
import { Grid } from "@mui/material";
import BookingDetail from "./Detail";

interface BookingDetailsProps {
  fields: any[]; // Assuming this matches your fields structure
  handleRemove: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  handleRemove,
  fields,
}) => {
  return (
    <Grid container spacing={2}>
      {fields.map((item, index) => (
        <BookingDetail item={item} index={index} handleRemove={handleRemove} />
      ))}
    </Grid>
  );
};

export default BookingDetails;
