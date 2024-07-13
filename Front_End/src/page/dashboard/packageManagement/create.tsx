// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { FormProvider, useForm, useFieldArray, Controller } from "react-hook-form";
// import { InputField, SelectField } from "@/components/form";
// import { Button, Grid, Box, MenuItem } from "@mui/material";
// import PATHS from "@/route/paths";
// import { useSnackbar } from "notistack";
// import { TCreatePackageResponse } from "@/schemaValidations/package.schema";
// import PackageApi from "@/actions/package";
// import { PackageSchema } from "@/schemaValidations/package.schema"; // Import your PackageSchema
// import { TServiceResponse } from "@/schemaValidations/service.schema";
// import ServiceApi from "@/actions/service"; // Import ServiceApi

// interface Service {
//     id: string;
//     name: string;
// }

// interface Props {
//     props: any;
//     data1: TServiceResponse[];
// }

// export default function CreatePackagePage({ props, data1 }: Props) {
//     const { PATH_DASHBOARD } = PATHS;
//     const { enqueueSnackbar } = useSnackbar();
//     const router = useRouter();
//     const methods = useForm<TCreatePackageResponse>({
//         resolver: zodResolver(PackageSchema), // Use PackageSchema as resolver
//         defaultValues: {
//             name: "",
//             description: "",
//             price: "",
//             image: "",
//             services: [], // Initialize services as an empty array
//             discount: "",
//             totalTime: "",
//         },
//     });

//     const { handleSubmit, control } = methods;
//     const { fields: serviceFields, append: appendService } = useFieldArray({
//         name: "services",
//         control: methods.control,
//     });

//     const [services, setServices] = useState<Service[]>([]);

//     useEffect(() => {
//         ServiceApi.getServices()
//             .then((response) => {
//                 if (response.status === 200) {
//                     setServices(response.payload.items); 
//                 } else {
//                     console.error("Failed to fetch services:", response);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching services:", error);
//             });
//     }, []);

//     const onSubmit = async (values: TCreatePackageResponse) => {
//         try {
//             const response = await PackageApi.createPackage(values);
//             console.log("values", values);
//             if (response.status === 201) {
//                 router.push(PATH_DASHBOARD.package);
//                 enqueueSnackbar("Tạo thành công", { variant: "success" });
//             }
//         } catch (error: any) {
//             console.error("error", error);
//             enqueueSnackbar("Tạo thất bại", { variant: "error" });
//         }
//     };

//     return (
//         <FormProvider {...methods}>
//             <Grid container spacing={2}>
//                 <Grid item xs={4}>
//                     <InputField name="name" label="Tên" fullWidth />
//                 </Grid>
//                 <Grid item xs={4}>
//                     <InputField name="description" label="Mô tả" fullWidth />
//                 </Grid>
//                 <Grid item xs={4}>
//                     <InputField name="price" label="Giá" type="number" fullWidth />
//                 </Grid>
//                 <Grid item xs={4}>
//                     <InputField name="image" label="Đường dẫn ảnh" fullWidth />
//                 </Grid>
//                 <Grid item xs={4}>
//                     <InputField name="totalTime" label="Thời gian tối đa" fullWidth />
//                 </Grid>
//                 <Grid item xs={4}>
//                     {serviceFields.map((field, index) => (
//                         <Box key={field.id} mb={2}>
//                             <Controller
//                                 name={`services.${index}`}
//                                 control={control}
//                                 render={({ field }) => (
//                                     <SelectField {...field} label={`Dịch vụ ${index + 1}`} fullWidth>
//                                         {services.map((service) => (
//                                             <MenuItem key={service.id} value={service.id}>
//                                                 {service.name}
//                                             </MenuItem>
//                                         ))}
//                                     </SelectField>
//                                 )}
//                             />
//                         </Box>
//                     ))}
//                     <Button
//                         type="button"
//                         variant="contained"
//                         onClick={() => appendService({})}
//                     >
//                         Thêm dịch vụ
//                     </Button>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <InputField name="discount" label="Giảm giá (%)" type="number" fullWidth />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         onClick={handleSubmit(onSubmit)}
//                         sx={{ marginTop: '10px', marginBottom: '10px' }}
//                     >
//                         Tạo
//                     </Button>
//                 </Grid>
//             </Grid>
//         </FormProvider>
//     );
// }


"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { InputField, SelectField } from "@/components/form";
import { Button, Grid, MenuItem } from "@mui/material";
import PATHS from "@/route/paths";
import { useSnackbar } from "notistack";
import { TCreatePackageResponse } from "@/schemaValidations/package.schema";
import PackageApi from "@/actions/package";
import { PackageSchema } from "@/schemaValidations/package.schema";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import ServiceApi from "@/actions/service";

interface Service {
    id: string;
    name: string;
}

interface Props {
    props: any;
    data1: TServiceResponse[];
}

export default function CreatePackagePage({ props, data1 }: Props) {
    const { PATH_DASHBOARD } = PATHS;
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const methods = useForm<TCreatePackageResponse>({
        resolver: zodResolver(PackageSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            image: "",
            services: [], // Initialize services as an empty array
            discount: "",
            totalTime: "",
        },
    });

    const { handleSubmit, control } = methods;
    const [services, setServices] = useState<Service[]>(data1);

    useEffect(() => {
        setServices(data1);
    }, [data1]);

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
                    {services && (
                        <Controller
                            name="services"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    {...field}
                                    label="Chọn dịch vụ"
                                    fullWidth
                                >
                                    {services.map((service) => (
                                        <MenuItem key={service.id} value={service.id}>
                                            {service.name}
                                        </MenuItem>
                                    ))}
                                </SelectField>
                            )}
                        />
                    )}
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
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                        Tạo
                    </Button>
                </Grid>
            </Grid>
        </FormProvider>
    );
}