"use client";
import React from "react";
import { Grid, styled } from "@mui/material";
import BookingDetail from "./Detail";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const StyledGrid = styled(Grid)({
  maxHeight: 300,
  overflow: "auto",
});

interface BookingDetailsProps {
  fields: any[]; // Assuming this matches your fields structure
  handleRemoveById: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  handleRemoveById,
  fields,
}) => {
  const carts = useSelector((state: RootState) => state.cart.products);
  return (
    <StyledGrid container spacing={4}>
      {carts.map((item: any, index: number) => (
        <BookingDetail
          key={item.id}
          item={item}
          index={index}
          handleRemoveById={handleRemoveById}
        />
      ))}
    </StyledGrid>
  );
};

export default BookingDetails;
