"use client";

import ServiceApi from '@/actions/service';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { InputField } from '@/components/form';
import { useSnackbar } from 'notistack';
import { TCreateServiceResponse, TServiceResponse } from '@/schemaValidations/service.schema';
import { useRouter } from 'next/router';
import PATHS from '@/route/paths';

interface Props {
  data: any;
}

export default function UpdateServicePage({ data }: Props) {
  const { PATH_DASHBOARD } = PATHS;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  
  const methods = useForm<TCreateServiceResponse>({
    defaultValues: {
      ...data,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: TCreateServiceResponse) => {
    try {
      const response = await ServiceApi.updateService(values, values.id);
      console.log('values', values);
      if (response.status === 200) {
        router.push(PATH_DASHBOARD.service);
        enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
      }
    } catch (error: any) {
      console.error('error', error);
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    }
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputField name="name" label="Tên" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="description" label="Mô tả" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="image" label="Đường dẫn ảnh" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="price" label="Giá" type="number" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <InputField name="time" label="Thời gian" type="number" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            sx={{ marginTop: '10px', marginBottom: '10px' }}
          >
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
