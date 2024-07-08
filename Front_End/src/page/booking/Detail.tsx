"use client";
import PackageApi from "@/actions/package";
import RoomApi from "@/actions/room";
import { formatDate, formatPriceVND } from "@/lib/utils";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { TPackageResponse } from "@/schemaValidations/package.schema";

type Props = {
  item: any;
  index: number;
  handleRemoveById: (id: any, index: number) => void;
};

export default function BookingDetail({
  item,
  index,
  handleRemoveById,
}: Props) {
  const [roomName, setRoomName] = useState<string>();
  const [packageObj, setPackageObj] = useState<TPackageResponse>();

  const fetchRoom = async () => {
    const response = await RoomApi.getRoomById(item.roomId);
    setRoomName(response.payload.name);
  };

  const fetchPackage = async () => {
    const response = await PackageApi.getPackage(item.packageId);
    setPackageObj(response.payload);
  };

  useEffect(() => {
    fetchRoom();
    fetchPackage();
  }, []);

  // Calculate checkOut date based on checkInDate and packageObj.totalTime
  const calculateCheckOut = () => {
    if (item.checkInDate && packageObj && packageObj.totalTime) {
      const checkInDate = dayjs(item.checkInDate);
      const checkOutDate = checkInDate.add(packageObj.totalTime, "minutes");
      return formatDate(checkOutDate.toDate());
    }
    return "Loading...";
  };
  console.log("sdsdsd", item);

  return (
    <Grid item xs={12} md={6} lg={6} key={index}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1">No: {index + 1}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => handleRemoveById(item.id, index)}
                style={{ marginLeft: "auto" }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="body1">
            <strong>Room:</strong> {roomName || "Loading..."}
          </Typography>
          <Typography variant="body1">
            <strong>Combo:</strong>{" "}
            {packageObj ? packageObj.name : <span>Loading...</span>}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> {formatPriceVND(item.price)}
          </Typography>
          <Typography variant="body1">
            <strong>CheckIn:</strong> {formatDate(item.checkInDate)}
          </Typography>
          <Typography variant="body1">
            <strong>CheckOut:</strong> {formatDate(item.checkOutDate)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
