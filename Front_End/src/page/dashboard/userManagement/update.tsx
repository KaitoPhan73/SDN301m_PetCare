// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { InputField, SelectField } from "@/components/form";
// import { Button, Grid } from "@mui/material";
// import PATHS from "@/route/paths";
// import { useSnackbar } from "notistack";
// import { IUser, UserSchema } from "@/schemaValidations/user.schema";
// import userApi from "@/actions/users";

// type Props = {
//   data: IUser;
// };

// export default function UpdatePartnersPage({ data }: Props) {
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();
//   const methods = useForm<IUser>({
//     resolver: zodResolver(UserSchema),
//     defaultValues: {
//       ...data,
//     },
//   });
//   const { handleSubmit } = methods;

//   const onSubmit = async (values: IUser) => {
//     try {
//       const response = await userApi.updateUser(data._id, values);
//       console.log("response", response);

//     } catch (error: any) {
//       console.error("Error updating user:", error);
//       enqueueSnackbar("Cập nhật thất bại", { variant: "error" });
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <InputField name="username" label="Username" fullWidth />
//         </Grid>
//         <Grid item xs={4}>
//           <InputField name="email" label="Email" fullWidth />
//         </Grid>
//         <Grid item xs={4}>
//           <SelectField
//             name="status"
//             label="Status"
//             options={[
//               { label: "Active", value: true },
//               { label: "Inactive", value: false },
//             ]}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <InputField name="role" label="Role" fullWidth />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleSubmit(onSubmit)}
//             sx={{ marginTop: "10px", marginBottom: "10px" }}
//           >
//             Cập nhật
//           </Button>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }
