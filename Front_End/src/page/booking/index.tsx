// File: BookingPage.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import {
  TBookingDetailForBookingRequest,
  TBookingDetailRequest,
} from "@/schemaValidations/booking-detail.schema";
import BookingDetailApi from "@/actions/booking-detail";
import RoomApi from "@/actions/room";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import PackageApi from "@/actions/package";
import { formatDate } from "@/lib/utils";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import PackageSelection from "./PackageSelection";
import { useDispatch } from "react-redux";
import { addToCart, deleteItem } from "@/redux/Cart/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DialogPayment } from "@/components/dialog-payment";
type Props = {
  data: {
    dataPakages: TPackageResponse[];
    dataRooms: TRoomResponse[];
  };
};

export default function BookingPage({ data }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const methods = useForm<TBookingRequest>({
    defaultValues: {
      userId: user?._id,
      bookingDetails: [],
    },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data: TBookingRequest) => {
    console.log(data);
    try {
      const createdBookingDetails: TBookingDetailForBookingRequest[] = [];

      const bookingDetails = data.bookingDetails;

      for (const item of bookingDetails) {
        const bookingDetail: TBookingDetailRequest = {
          packageId: item.packageId,
          roomId: item.roomId,
          checkInDate: item.checkInDate,
          price: item.price,
        };

        const createdDetail = await BookingDetailApi.createBookingDetail(
          bookingDetail
        );
        createdBookingDetails.push(createdDetail.payload);
      }
      // Thêm các bookingDetails vào data.bookingDetails
      data.bookingDetails = createdBookingDetails.map((detail) => ({
        _id: detail._id,
        packageId: detail.packageId,
        roomId: detail.roomId,
        checkInDate: detail.checkInDate,
        price: detail.price,
      }));

      // Tạo booking chính với bookingDetails đã được thêm vào
      const response = await BookingApi.createBooking(data);
      console.log("response", response);
      if (response.status === 201) {
        enqueueSnackbar("Quý khách đã booking thành công. Cảm ơn quý khách", {
          variant: "success",
        });
        router.refresh();
        while (fields.length > 0) {
          remove(0); // Xóa từng phần tử đầu tiên của mảng fields
        }
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi booking. Vui lòng thử lại", {
        variant: "error",
      });
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
  const dispatch = useDispatch();
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

  const handleClosePackageSelection = () => setShowPackageSelection(false);

  const handleRemoveById = (id: string, index: number) => {
    // Tìm chỉ mục của phần tử cần xoá dựa trên id
    const indexToRemove = fields.findIndex((field) => field.id === id);
    dispatch(deleteItem(index));
    remove(index);
    // if (indexToRemove !== -1) {
    //   remove(indexToRemove);
    // }
  };

  const fetchRoom = async (id: string) => {
    const response = await RoomApi.getRoomById(id);
    return response.payload.price;
  };

  const fetchPackage = async (id: string) => {
    const response = await PackageApi.getPackage(id);
    return response.payload.totalTime;
  };

  const fetchExistingBookingDetails = async () => {
    const body = {
      roomId: roomId,
      checkInDate: checkInDate,
      packageId: selectedPackage?._id,
    };

    const response = await BookingDetailApi.checkExistBookingDetailFromServer(
      body
    );
    return response.payload;
  };

  const handleConfirmDateRoomSelection = async () => {
    if (!selectedPackage || !checkInDate || !roomId) return;

    const packageTotalTime = selectedPackage.totalTime;
    const roomCheckInTime = dayjs(checkInDate);
    const roomCheckOutTime = roomCheckInTime.add(packageTotalTime, "minute");

    let isConflictingRoom = false;
    const exist = await fetchExistingBookingDetails();
    console.log("ok", exist);

    if (exist) {
      console.log("hahahahh");
      alert(
        `Thời gian check-in, checkout của bạn (${formatDate(
          roomCheckInTime.toDate()
        )} - ${formatDate(
          roomCheckOutTime.toDate()
        )}) đã tồn tại với thời gian đã tồn tại. Vui lòng chọn giờ khác hoặc phòng khác.`
      );
      return;
    }
    for (const item of fields) {
      const existingPackageTotalTime = await fetchPackage(item.packageId);
      const existingCheckInTime = dayjs(item.checkInDate);
      const existingCheckOutTime = existingCheckInTime.add(
        existingPackageTotalTime,
        "minute"
      );

      if (
        roomCheckOutTime.isAfter(existingCheckInTime) &&
        roomCheckInTime.isBefore(existingCheckOutTime) &&
        item.roomId === roomId
      ) {
        alert(
          `Thời gian check-in, checkout của bạn (${formatDate(
            roomCheckInTime.toDate()
          )} - ${formatDate(
            roomCheckOutTime.toDate()
          )}) đã tồn tại với thời gian đã tồn tại khoảng (${formatDate(
            existingCheckInTime.toDate()
          )} - ${formatDate(
            existingCheckOutTime.toDate()
          )}) của phòng này. Vui lòng chọn giờ khác hoặc phòng khác.`
        );

        isConflictingRoom = true;
        break;
      }

      if (
        roomCheckInTime.isBefore(existingCheckInTime) &&
        roomCheckOutTime.isAfter(existingCheckInTime) &&
        item.roomId === roomId
      ) {
        alert(
          `Thời gian check-in, checkout của bạn (${formatDate(
            roomCheckInTime.toDate()
          )} - ${formatDate(
            roomCheckOutTime.toDate()
          )}) đã tồn tại với thời gian đã tồn tại khoảng (${formatDate(
            existingCheckInTime.toDate()
          )} - ${formatDate(
            existingCheckOutTime.toDate()
          )}) của phòng này. Vui lòng chọn giờ khác hoặc phòng khác.`
        );

        isConflictingRoom = true;
        break;
      }
    }

    if (isConflictingRoom) {
      return;
    }
    const responseRoomPrice = await fetchRoom(roomId);

    const newBookingDetail = {
      packageId: selectedPackage._id,
      roomId: roomId,
      checkInDate: checkInDate.toDate(),
      checkOutDate: roomCheckOutTime.toDate(),
      price: selectedPackage.price + responseRoomPrice,
    };

    append(newBookingDetail);
    dispatch(addToCart(newBookingDetail));
    setCheckInDate(null);
    setRoomId("");
    setShowDateRoomSelection(false);
  };
  const carts = useSelector((state: RootState) => state.cart.products);
  console.log("fields", fields);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item xs={0} md={4} lg={4}>
            <Image
              src="https://as2.ftcdn.net/v2/jpg/01/48/74/83/1000_F_148748366_BKmJs1zHClJl12VA2GV6bBolhPUPleon.jpg"
              alt="perfume bottle image"
              width={450}
              height={450}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Page title="" spacing={4}>
              <Grid container item xs={12}>
                {carts.length > 0 ? (
                  <>
                    <Grid item xs={6}>
                      <button
                        onClick={handleOpenPackageSelection}
                        className="rounded-full w-full max-w-[200px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-black"
                      >
                        <span className="px-2">More combo</span>
                      </button>
                    </Grid>
                    <Grid item xs={6}>
                      <DialogPayment />
                    </Grid>
                  </>
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "200px" }}
                  >
                    <button
                      onClick={handleOpenPackageSelection}
                      className="rounded-full w-full max-w-[280px] py-8 text-center justify-center items-center bg-black font-semibold text-lg text-white flex transition-all duration-500 hover:bg-gray-100 hover:text-black"
                    >
                      <span className="px-2">Click Here To Booking</span>
                    </button>
                  </Grid>
                )}
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <BookingDetails
                    fields={fields}
                    handleRemoveById={handleRemoveById}
                  />
                </Grid>
              </Grid>
            </Page>
          </Grid>
        </Grid>

        {/* First FullScreenToggle for package selection */}
        <PackageSelection
          dataPackages={data.dataPakages}
          onSelectPackage={handleSelectPackage}
          open={showPackageSelection}
          onClose={handleClosePackageSelection}
        />

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
