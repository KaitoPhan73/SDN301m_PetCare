/* eslint-disable react/prop-types */
import { Box, Stack, TextField } from "@mui/material";
import { DateRangePicker, DateRangePickerProps } from "@nextui-org/date-picker";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  rules?: any;
  defaultValue?: any;
};

const DateRangePickerField: React.FC<Props & Partial<DateRangePickerProps>> = ({
  name,
  label = null,
  rules,
  defaultValue = [null, null],
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <DateRangePicker
          {...field}
          value={field.value ?? [null, null]}
          variant="bordered"
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default DateRangePickerField;
