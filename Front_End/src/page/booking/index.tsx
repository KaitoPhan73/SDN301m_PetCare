// File: BookingPage.tsx
"use client";
import React, { useState } from "react";
import { Button, Grid, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Page from "@/components/PageProps";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import {
  TBookingRequest,
  TBookingResponse,
} from "@/schemaValidations/booking.schema";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import FullScreenToggle from "@/components/ToggleFull";
import DatePickerField from "@/components/form/DatePickerField";
import SelectField from "@/components/form/SelectField";
import { TRoomResponse } from "@/schemaValidations/room.schema";
import BookingDetails from "./BookingDetails";
import BookingApi from "@/actions/booking";
import { TBookingDetailRequest } from "@/schemaValidations/booking-detail.schema";
import BookingDetailApi from "@/actions/booking-detail";
import RoomApi from "@/actions/room";

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
      // Assume userId and other data are available in data object
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

      // Handle success, navigate to success page or update UI
    } catch (error) {
      console.log("Error:", error);
      // Handle error, show error message or handle retry logic
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
  const fetchRoom = async (id: string) => {
    const response = await RoomApi.getRoomById(id);
    return response.payload.price;
  };

  const handleConfirmDateRoomSelection = async (index: number) => {
    const updatedBookingDetails = [...methods.getValues("bookingDetails")];

    // Gọi fetchRoom và đợi nó hoàn thành với await
    const responseRoomPrice = await fetchRoom(
      methods.getValues(`bookingDetails.${index}.roomId`)
    );
    updatedBookingDetails[index] = {
      ...updatedBookingDetails[index],
      bookingId: "",
      packageId: selectedPackage?._id!,
      checkInDate: methods.getValues(`bookingDetails.${index}.checkInDate`),
      price: selectedPackage?.price! + responseRoomPrice,
      roomId: methods.getValues(`bookingDetails.${index}.roomId`),
    };

    methods.setValue("bookingDetails", updatedBookingDetails);
    setShowDateRoomSelection(false);
  };

  const handleRemove = (index: number) => {
    console.log("remove", index);
    remove(index);
  };

  console.log("fields", fields);
  return (
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
              <Button variant="contained" onClick={handleOpenPackageSelection}>
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
              <BookingDetails fields={fields} handleRemove={handleRemove} />
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
            <DatePickerField
              name={`bookingDetails.${fields.length}.checkInDate`}
              label="Ngày nhận phòng"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectField
              name={`bookingDetails.${fields.length}.roomId`}
              label="Chọn phòng"
              options={roomOptions || []}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => handleConfirmDateRoomSelection(fields.length)}
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </FullScreenToggle>
    </FormProvider>
  );
}
