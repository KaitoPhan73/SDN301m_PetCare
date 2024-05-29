"use client";
import brandApi from "@/actions/brands";
import { BrandBody, TBrandBody } from "@/schemaValidations/brand.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "@/components/form";
import { Button, Grid, TextField } from "@mui/material";
import PATHS from "@/route/paths";
import { statusList } from "./config";

export default function CreateBrandPage() {
  const { PATH_DASHBOARD } = PATHS;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const methods = useForm<TBrandBody>({
    resolver: zodResolver(BrandBody),
    defaultValues: {
      name: "",
      code: "",
      descriptions: "",
      taxCode: "",
      secretKey: "",
      status: 0,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (values: TBrandBody) => {
    try {
      const response = await brandApi.createBrand(values);
      console.log("values", values);
      if (response.status === 200) {
        router.push(PATH_DASHBOARD.brand);
        enqueueSnackbar("Tạo thành công", { variant: "success" });
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };
  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputField name="name" label="Tên" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="code" label="Mã thương hiệu" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="taxCode" label="Mã số thuế" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="descriptions" label="Mô tả" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="secretKey" label="Mã bí mật" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <SelectField
            name="status"
            label="Trạng thái"
            options={statusList}
            fullWidth
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Tạo
        </Button>
      </Grid>
    </FormProvider>
  );
}
