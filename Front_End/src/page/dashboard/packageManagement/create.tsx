"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { InputField, SelectField } from "@/components/form";
import { Button, Grid, Box } from "@mui/material";
import PATHS from "@/route/paths"; 
import { useSnackbar } from "notistack";
import { CreatePakageBody, TCreatePackageResponse } from "@/schemaValidations/package.schema";
import PackageApi from "@/actions/package";

export default function CreatePackagePage() {
    const { PATH_DASHBOARD } = PATHS;
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const methods = useForm<TCreatePackageResponse>({
        resolver: zodResolver(CreatePakageBody),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            image: "",
            services: [],
            discount: 0,
            totalTime: 0,
        },
    });

    const { handleSubmit, control } = methods;

    const { fields: serviceFields, append: appendService } = useFieldArray({
        control,
        name: "services",
    });

    const onSubmit = async (values: TCreatePackageResponse) => {
        try {
            const response = await PackageApi.createPackage(values);
            console.log("values", values);
            if (response.status === 201) {
                router.push(PATH_DASHBOARD.package);
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
                    <InputField name="price" label="Giá" type="number" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <InputField name="image" label="Đường dẫn ảnh" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <InputField name="totaltime" label="Thời gian tối đa" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    {serviceFields.map((field, index) => (
                        <Box key={field.id} mb={2}>
                            <SelectField name={`services.${index}`} label={`Dịch vụ ${index + 1}`} fullWidth />
                        </Box>
                    ))}
                    <Button
                        type="button"
                        variant="contained"
                        onClick={() => appendService()}
                    >
                        Thêm dịch vụ
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <InputField name="discount" label="Giảm giá (%)" type="number" fullWidth />
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
