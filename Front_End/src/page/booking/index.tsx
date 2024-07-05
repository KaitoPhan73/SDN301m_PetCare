// File: BookingPage.tsx
"use client";
import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Image from "next/image";
import Page from "@/components/PageProps";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import {
  TBookingRequest,
  TBookingResponse,
} from "@/schemaValidations/booking.schema";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import FullScreenToggle from "@/components/ToggleFull";
import { TRoomResponse } from "@/schemaValidations/room.schema";
import BookingDetails from "./BookingDetails";
import BookingApi from "@/actions/booking";
import { TBookingDetailRequest } from "@/schemaValidations/booking-detail.schema";
import BookingDetailApi from "@/actions/booking-detail";
import RoomApi from "@/actions/room";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import PackageApi from "@/actions/package";
import { formatDate } from "@/lib/utils";

type Props = {
  data: {
    dataPakages: TPackageResponse[];
    dataRooms: TRoomResponse[];
  };
};

export default function BookingPage({ data }: Props) {
  const methods = useForm<TBookingRequest>({
    defaultValues: {
      userId: "sdsds",
      bookingDetails: [],
    },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data: TBookingRequest) => {
    console.log(data);
    try {
      const responseBooking = await BookingApi.createBooking(data.userId);
      const bookingId = responseBooking.payload._id;

      fields.forEach(async (item) => {
        const bookingDetail: TBookingDetailRequest = {
          bookingId: bookingId,
          packageId: item.packageId,
          roomId: item.roomId,
          checkInDate: item.checkInDate,
          price: item.price,
        };

        await BookingDetailApi.createBookingDetail(bookingDetail);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const { fields, append, remove } = useFieldArray<TBookingRequest>({
    control,
    name: "bookingDetails",
  });
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [showDateRoomSelection, setShowDateRoomSelection] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<TPackageResponse | null>(null);

  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [roomId, setRoomId] = useState<string>("");

  const handleOpenPackageSelection = () => {
    setShowPackageSelection(true);
  };

  const roomOptions = data.dataRooms.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const handleSelectPackage = (pakage: TPackageResponse) => {
    setSelectedPackage(pakage);
    setShowPackageSelection(false);
    setShowDateRoomSelection(true);
  };

  const handleRemoveById = (id: string) => {
    // Tìm chỉ mục của phần tử cần xoá dựa trên id
    const indexToRemove = fields.findIndex((field) => field.id === id);

    if (indexToRemove !== -1) {
      remove(indexToRemove);
    }
  };

  const fetchRoom = async (id: string) => {
    const response = await RoomApi.getRoomById(id);
    return response.payload.price;
  };

  const fetchPackage = async (id: string) => {
    const response = await PackageApi.getPackage(id);
    return response.payload.totalTime;
  };

  const handleConfirmDateRoomSelection = async () => {
    if (!selectedPackage || !checkInDate || !roomId) return;

    // Lấy totalTime của gói sản phẩm hiện tại
    const packageTotalTime = selectedPackage.totalTime;
    const roomCheckInTime = dayjs(checkInDate);

    let isConflictingRoom = false;

    // Duyệt qua từng item trong fields
    for (const item of fields) {
      // Lấy totalTime của gói sản phẩm hiện có trong booking detail
      const existingPackageTotalTime = await fetchPackage(item.packageId);

      // Tính thời gian dự kiến check-out của phòng hiện tại
      const roomCheckOutTime = roomCheckInTime.add(packageTotalTime, "minute");

      const bookingDetailCheckInTime = dayjs(item.checkInDate).add(
        existingPackageTotalTime,
        "minute"
      );
      const minutesRemaining = roomCheckInTime.diff(
        bookingDetailCheckInTime,
        "minute"
      );

      const minutesRemaining2 = roomCheckInTime.diff(
        dayjs(item.checkInDate),
        "minute"
      );
      console.log("minutesRemaining", minutesRemaining);
      console.log("minutesRemaining2", minutesRemaining2);
      // Kiểm tra xem có xung đột thời gian

      if (minutesRemaining < 0 && item.roomId === roomId) {
        // Tính thời gian dự kiến có thể đặt sau
        const futureTime = dayjs(item.checkInDate).add(
          existingPackageTotalTime,
          "minute"
        );
        console.log("futureTime", futureTime);
        // Hiển thị thông báo xung đột
        alert(
          `Phòng này đã được đặt vào lúc ${formatDate(
            item.checkInDate
          )}. Chỉ có thể đặt lúc ${formatDate(
            futureTime.toDate()
          )}. Vui lòng chọn thời gian khác hoặc phòng khác.`
        );

        isConflictingRoom = true;
        break; // Dừng vòng lặp khi có xung đột
      }
      if (
        roomCheckInTime.toDate() < dayjs(item.checkInDate).toDate() &&
        item.roomId === roomId
      ) {
        if (roomCheckOutTime.toDate() >= dayjs(item.checkInDate).toDate()) {
          alert(
            `Gói của bạn có thể đụng độ với một gói đã đặt trước đó. Vui lòng chọn thời gian khác hoặc phòng khác.`
          );

          isConflictingRoom = true;
          return false;
        }
      }

      // Tính toán khoảng thời gian tối thiểu mà phải chờ
      const minTimeDifference = Math.abs(existingPackageTotalTime);

      // Kiểm tra thời gian giữa các lần đặt phòng có đủ lớn không
      if (!(minutesRemaining >= 0 || item.roomId !== roomId)) {
        // Nếu không thỏa điều kiện, đánh dấu là không hợp lệ
        isConflictingRoom = true;
        break;
      }
    }

    // Nếu có xung đột thời gian hoặc không hợp lệ, không thực hiện đặt phòng mới
    if (isConflictingRoom) {
      return;
    }

    // Lấy giá phòng từ API
    const responseRoomPrice = await fetchRoom(roomId);

    // Tạo thông tin booking detail mới
    const newBookingDetail = {
      bookingId: "",
      packageId: selectedPackage._id,
      roomId: roomId,
      checkInDate: checkInDate.toDate(),
      price: selectedPackage.price + responseRoomPrice,
    };

    // Thêm booking detail mới vào danh sách
    append(newBookingDetail);

    // Đặt lại trạng thái của form sau khi thêm mới
    setCheckInDate(null);
    setRoomId("");
    setShowDateRoomSelection(false);
  };

  console.log("fields", fields);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={0} md={6} lg={6}>
            <Image
              src="https://static.wixstatic.com/media/b86d60_b59544c05a0343d0974df142775854cd~mv2.png/v1/fill/w_640,h_440,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/b86d60_b59544c05a0343d0974df142775854cd~mv2.png"
              alt="perfume bottle image"
              width={640}
              height={440}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Page title="Booking">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={handleOpenPackageSelection}
                >
                  Chọn combo
                </Button>
              </Grid>
              {fields.length > 0 && (
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Booking
                  </Button>
                </Grid>
              )}

              <Grid item xs={12}>
                <BookingDetails
                  fields={fields}
                  handleRemoveById={handleRemoveById}
                />
              </Grid>
            </Page>
          </Grid>
        </Grid>

        {/* First FullScreenToggle for package selection */}
        <FullScreenToggle
          title="Chọn gói dịch vụ"
          open={showPackageSelection}
          onClose={() => setShowPackageSelection(false)}
        >
          <Grid container spacing={2}>
            {data.dataPakages.map((item: TPackageResponse) => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Card onClick={() => handleSelectPackage(item)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </FullScreenToggle>

        {/* Second FullScreenToggle for date and room selection */}
        <FullScreenToggle
          title="Chọn ngày và phòng"
          open={showDateRoomSelection}
          onClose={() => setShowDateRoomSelection(false)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Ngày nhận phòng"
                value={checkInDate}
                onChange={(date) => setCheckInDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="room-select-label">Chọn phòng</InputLabel>
                <Select
                  labelId="room-select-label"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value as string)}
                >
                  {roomOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleConfirmDateRoomSelection}
              >
                Xác nhận
              </Button>
            </Grid>
          </Grid>
        </FullScreenToggle>
      </FormProvider>
    </LocalizationProvider>
  );
}
