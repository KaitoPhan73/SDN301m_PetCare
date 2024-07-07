"use client";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";
import InputField from "@/components/form/InputField";
import { TBookingRequest } from "@/schemaValidations/booking.schema";
import { TBookingDetailRequest } from "@/schemaValidations/booking-detail.schema";
type Props = {
  isModalOpen: boolean;
  handleModalOk: () => void;
  handleModalCancel: () => void;
};

export default function ModalAdd({
  isModalOpen,
  handleModalOk,
  handleModalCancel,
  packageId,
}: Props) {
  return (
    <Modal
      title="Booking"
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <InputField name="content" label="Input your content" />
    </Modal>
  );
}
