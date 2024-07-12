"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "@/components/form";
import { Button, Grid } from "@mui/material";
import PATHS from "@/route/paths"; 
import { useSnackbar } from "notistack";
import { CreateServiceBody, TCreateServiceResponse } from "@/schemaValidations/service.schema";
import ServiceApi from "@/actions/service";

export default function CreateServicePage() {
    const { PATH_DASHBOARD } = PATHS;
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const methods = useForm<TCreateServiceResponse>({
        resolver: zodResolver(CreateServiceBody),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            image: "",
            time: 0,
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (values: TCreateServiceResponse) => {
        try {
            const response = await ServiceApi.createService(values);
            console.log("values", values);
            if (response.status === 201) {
                router.push(PATH_DASHBOARD.service);
                enqueueSnackbar("Tạo thành công", { variant: "success" });
            }
        } catch (error: any) {
            console.error("error", error);
            enqueueSnackbar("Tạo thất bại", { variant: "error" });
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
                        Tạo
                    </Button>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
