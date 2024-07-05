import PackageApi from "@/actions/package";
import RoomApi from "@/actions/room";
import { formatDate, formatPriceVND } from "@/lib/utils";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  item: any;
  index: number;
  handleRemove: (index: number) => void; // Chỉnh sửa props để nhận index
};

export default function BookingDetail({ item, index, handleRemove }: Props) {
  const [roomName, setRoomName] = useState<string>();
  const [packageName, setPackageName] = useState<string>();

  const fetchRoom = async () => {
    const response = await RoomApi.getRoomById(item.roomId);
    setRoomName(response.payload.name);
  };

  const fetchPackage = async () => {
    const response = await PackageApi.getPackage(item.packageId);
    setPackageName(response.payload.name);
  };

  useEffect(() => {
    fetchRoom();
    fetchPackage();
  }, []);

  return (
    <Grid item xs={12} md={6} lg={4} key={index}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1">No: {index + 1}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => handleRemove(index)}
                style={{ marginLeft: "auto" }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="body1">
            Phòng: {roomName || "Loading..."}
          </Typography>
          <Typography variant="body1">
            Combo: {packageName || "Loading..."}
          </Typography>
          <Typography variant="body1">
            Price: {formatPriceVND(item.price)}
          </Typography>
          <Typography variant="body1">
            CheckIn: {formatDate(item.checkInDate)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
