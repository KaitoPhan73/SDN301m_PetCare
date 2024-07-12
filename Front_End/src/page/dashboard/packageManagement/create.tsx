"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { InputField, SelectField } from "@/components/form";
import { Button, Grid, Box, MenuItem } from "@mui/material";
import PATHS from "@/route/paths"; 
import { useSnackbar } from "notistack";
import { CreatePakageBody, TCreatePackageResponse } from "@/schemaValidations/package.schema";
import PackageApi from "@/actions/package";
import ServiceApi from "@/actions/service";
import { PackageSchema } from "@/schemaValidations/package.schema"; // Import your PackageSchema

interface Props {
    props: any;
    data1: any;
}

export default function CreatePackagePage({ props, data1 }: Props) {
    const { PATH_DASHBOARD } = PATHS;
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const methods = useForm<TCreatePackageResponse>({
        resolver: zodResolver(PackageSchema), // Use PackageSchema as resolver
        defaultValues: {
            name: "",
            description: "",
            price: "",
            image: "",
            services: [],
            discount: "",
            totalTime: "",
        },
    });

    const { handleSubmit } = methods;
    const { fields: serviceFields, append: appendService } = useFieldArray({
        name: "services",
    });

    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await ServiceApi.getServices();
                setServices(response.payload.items);
            } catch (error) {
                console.error("Failed to fetch services", error);
            }
        }
        fetchServices();
    }, []);

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
                    <InputField name="totalTime" label="Thời gian tối đa" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    {serviceFields.map((field, index) => (
                        <Box key={field.id} mb={2}>
                            <SelectField name={`services.${index}`} label={`Dịch vụ ${index + 1}`} fullWidth>
                                {services.map(service => (
                                    <MenuItem key={service._id} value={service._id}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </SelectField>
                        </Box>
                    ))}
                    <Button
                        type="button"
                        variant="contained"
                        onClick={() => appendService({ serviceId: "" })}
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
