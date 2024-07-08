"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Giả sử bạn có component Button riêng
import {
  RegisterSchema,
  TRegisterRequest,
} from "@/schemaValidations/auth.schema";
import { Grid } from "@mui/material";
import { InputField } from "@/components/form";
import authApi from "@/actions/auth";
import { useSnackbar } from "notistack";

export function RegisterForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      role: "Customer",
    },
  });

  const onSubmit = async (values: TRegisterRequest) => {
    try {
      console.log(values);
      const response = await authApi.createUser(values);
      if (response.status === 200) {
        enqueueSnackbar("Register success", { variant: "success" });
        router.push("/login");
        router.refresh();
      }
    } catch (error: any) {
      enqueueSnackbar("Register failed", { variant: "error" });
      form.reset();
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <Grid container spacing={2}>
          {/* Grid item cho trường username */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Username</p>
            <InputField name="username" label="Username" fullWidth />
          </Grid>

          {/* Grid item cho trường email */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Email</p>
            <InputField name="email" label="Email" fullWidth />
          </Grid>

          {/* Grid item cho trường password */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Password</p>
            <InputField
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </Grid>

          {/* Grid item cho trường confirmPassword */}
          <Grid item xs={12}>
            <p className="font-medium text-gray-700 mb-1">Confirm Password</p>
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
            />
          </Grid>

          {/* Grid item cho nút submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              className="!mt-8 w-full bg-black text-white hover:bg-gray-200 hover:text-black transition duration-300"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
