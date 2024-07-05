import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

interface DatePickerFieldProps {
  name: string;
  label: string;
  defaultValue?: Date | null;
  [x: string]: any;
}

const DatePickerField = ({
  name,
  label,
  defaultValue = new Date(),
  ...props
}: DatePickerFieldProps) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value, ...restField },
          fieldState: { error },
        }) => (
          <DatePicker
            label={label}
            value={value ? dayjs(value) : dayjs()}
            onChange={(newValue) => {
              const date = newValue ? newValue.toDate() : new Date();
              onChange(date);
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
